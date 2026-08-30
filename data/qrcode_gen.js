/* =====================================================================
 * qrcode_gen.js — 零依赖最小 QR 编码器（V1-V6, ECC M）
 * 用途：分享图进站二维码（链接为 ASCII URL，byte 模式足够）
 * API：QR_GEN.toMatrix(text) -> Array<Array<0|1>>（含 4 模块静区）
 *      QR_GEN.toCanvas(canvas, text, modulePx) -> 直接绘制
 * 实现：ISO/IEC 18004（对齐 Nayuki/qrcode-generator 标准算法）：
 *       GF(256) Reed-Solomon；标准数据填充(终止符+0xEC/0x11)；
 *       zigzag 放置（-1 标记空位避免覆盖功能图案）；8 掩码惩罚选优。
 * 容量：V6-M byte 模式 106 字节（本产品分享 URL < 80，安全）
 * 生成：2026-08-31（node 端已用 jsQR 解码验证）
 * ===================================================================== */
var QR_GEN = (function(){
  'use strict';

  /* ---------- GF(256) ---------- */
  var EXP=new Array(256), LOG=new Array(256);
  (function(){
    var i,x=1;
    for(i=0;i<256;i++){ EXP[i]=x; LOG[x]=i; x<<=1; if(x&256) x^=0x11d; }
    LOG[0]=0;
  })();
  function mul(a,b){ return (!a||!b)?0:EXP[(LOG[a]+LOG[b])%255]; }

  /* ---------- Reed-Solomon（官方 d-project 算法：GF 表一致、生成多项式 (1+exp·x) 连乘、长除法取余） ---------- */
  function rsPoly(degree){
    var p=[1], d, j;
    for(d=0; d<degree; d++){
      /* p *= (1 + EXP[d]*x) */
      var np=new Array(p.length+1).fill(0);
      for(j=0;j<p.length;j++){
        np[j]^=p[j];
        np[j+1]^=mul(p[j], EXP[d]);
      }
      p=np;
    }
    return p;
  }
  function rsEncode(data, eccLen){
    var gen=rsPoly(eccLen); /* 长度 eccLen+1，首项 1（x^eccLen 系数） */
    var res=data.concat(new Array(eccLen).fill(0)); /* 尾部补 0 = 乘 x^eccLen */
    while(res.length - gen.length >= 0){
      var coeff=res[0];
      for(var j=0;j<gen.length;j++) res[j]^=mul(gen[j], coeff);
      var off=0; while(off<res.length && res[off]===0) off++;
      res=res.slice(off);
    }
    while(res.length<eccLen) res.unshift(0); /* 左补 0 到 eccLen */
    return res.slice(0, eccLen);
  }
  var RS_TABLE={
    1:[{n:1,d:16,t:26}], 2:[{n:1,d:28,t:44}], 3:[{n:2,d:22,t:35}],
    4:[{n:2,d:32,t:50}], 5:[{n:2,d:43,t:67}], 6:[{n:4,d:27,t:43}]
  };
  var ALIGN={ 2:[6,18], 3:[6,22], 4:[6,26], 5:[6,30], 6:[6,34] };
  /* 格式信息 15bit（ECC M × 掩码 0-7，标准表） */
  var FORMAT=[0b101010000010010,0b101000100100101,0b101111001111100,0b101101101001011,
              0b100010111111001,0b100000011001110,0b100111110010111,0b100101010100000];
  var MAX_BYTES={1:14,2:26,3:42,4:62,5:84,6:106};

  /* ---------- 数据编码（标准填充） ---------- */
  function encodeData(text){
    var bytes=[];
    for(var i=0;i<text.length;i++){
      var c=text.charCodeAt(i);
      if(c>127){
        if(c<0x800) bytes.push(0xC0|(c>>6),0x80|(c&63));
        else bytes.push(0xE0|(c>>12),0x80|((c>>6)&63),0x80|(c&63));
      } else bytes.push(c);
    }
    var ver=1;
    for(;ver<=6;ver++){ if(bytes.length<=MAX_BYTES[ver]) break; }
    if(ver>6) return null;
    var bits=[];
    function putBits(v,n){ for(var b=n-1;b>=0;b--) bits.push((v>>b)&1); }
    putBits(4,4);
    putBits(bytes.length, ver<=9?8:16);
    for(var k=0;k<bytes.length;k++) putBits(bytes[k],8);
    var cap=0, dataLen=0, groups=RS_TABLE[ver];
    for(var g=0;g<groups.length;g++){ cap+=groups[g].t*groups[g].n; dataLen+=groups[g].d*groups[g].n; }
    var maxBits=dataLen*8;
    /* 终止符（最多 4 位 0） */
    if(bits.length+4<=maxBits) putBits(0,4);
    /* 字节对齐 */
    while(bits.length%8!==0) bits.push(0);
    /* 填充 0xEC/0x11 交替 */
    var pad=true;
    while(bits.length+8<=maxBits){ putBits(pad?0xEC:0x11,8); pad=!pad; }
    var data=[];
    for(var d=0;d<bits.length;d+=8){
      var b=0; for(var e=0;e<8;e++) b=(b<<1)|bits[d+e];
      data.push(b);
    }
    return {ver:ver, data:data};
  }

  /* ---------- 矩阵构建（-1=空位；功能图案画 0/1） ---------- */
  function buildMatrix(ver, data, mask){
    var size=ver*4+17, m=[];
    for(var r=0;r<size;r++){ m.push(new Array(size).fill(-1)); }
    var y,x;

    function drawFinder(r0,c0){
      for(var r=-1;r<=7;r++) for(var c=-1;c<=7;c++){
        var rr=r0+r, cc=c0+c;
        if(rr<0||rr>=size||cc<0||cc>=size) continue;
        var inF=(r>=0&&r<=6&&c>=0&&c<=6);
        var dark=inF && (r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4));
        m[rr][cc]=dark?1:0; /* 含分隔符区域（非 -1，阻止数据覆盖） */
      }
    }
    drawFinder(0,0); drawFinder(0,size-7); drawFinder(size-7,0);

    /* timing */
    for(y=8;y<size-8;y++){ m[y][6]=((y%2)===0)?1:0; m[6][y]=((y%2)===0)?1:0; }

    /* alignment（V2+，跳过被 finder 占据的三角） */
    if(ALIGN[ver]){
      var centers=ALIGN[ver];
      for(var a=0;a<centers.length;a++) for(var b=0;b<centers.length;b++){
        var cr=centers[a], cc2=centers[b];
        if((cr===6&&cc2===6)||(cr===6&&cc2===size-7)||(cr===size-7&&cc2===6)) continue;
        for(var r=-2;r<=2;r++) for(var c=-2;c<=2;c++){
          var dark=(Math.abs(r)===2||Math.abs(c)===2||(r===0&&c===0));
          m[cr+r][cc2+c]=dark?1:0;
        }
      }
    }
    m[size-8][8]=1; /* dark module */

    /* 预占格式信息位（与官方 d-project 布局一致；最终值由 drawFormat 写入） */
    (function(){
      var i;
      /* vertical: (0..5,8),(7,8),(8,8),(14..20,8) */
      for(i=0;i<=5;i++){ m[i][8]=0; }
      m[7][8]=0; m[8][8]=0;
      for(i=8;i<=14;i++){ m[size-15+i][8]=0; }
      /* horizontal: (8,20..13),(8,7),(8,5..0) */
      for(i=0;i<=7;i++){ m[8][size-1-i]=0; }
      m[8][7]=0;
      for(i=9;i<=14;i++){ m[8][15-i-1]=0; }
    })();

    /* zigzag 数据放置（仅 -1 空位；放置时直接按掩码异或，等价标准后处理） */
    var bits=[], idx=0;
    for(var i=0;i<data.length;i++) for(var b=7;b>=0;b--) bits.push((data[i]>>b)&1);
    var inc=-1, row=size-1, col=size-1;
    while(col>0){
      if(col===6) col-=1;
      for(;;){
        for(var c2=0;c2<2;c2++){
          var cx=col-c2;
          if(m[row][cx]===-1){
            var bit=(idx<bits.length)?bits[idx]:0;
            idx++;
            var mm=0;
            switch(mask){
              case 0: mm=((row+cx)%2)===0; break;
              case 1: mm=(row%2)===0; break;
              case 2: mm=(cx%3)===0; break;
              case 3: mm=((row+cx)%3)===0; break;
              case 4: mm=(((row>>1)+(cx/3|0))%2)===0; break;
              case 5: mm=((row*cx)%2+(row*cx)%3)===0; break;
              case 6: mm=(((row*cx)%2+((row*cx)%3))%2)===0; break;
              case 7: mm=((((row+cx)%2)+((row*cx)%3))%2)===0; break;
            }
            m[row][cx]=bit^(mm?1:0);
          }
        }
        row+=inc;
        if(row<0||row>=size){ row-=inc; inc=-inc; break; }
      }
      col-=2;
    }
    /* 残余空位补 0（理论不会发生） */
    for(var r2=0;r2<size;r2++) for(var c3=0;c3<size;c3++) if(m[r2][c3]===-1) m[r2][c3]=0;
    return m;
  }

  /* 格式信息（官方 d-project 布局；位序 LSB 先，(bits>>>i)&1 与官方一致） */
  function drawFormat(m, mask){
    var bits=FORMAT[mask], size=m.length, i;
    for(i=0;i<15;i++){
      var mod=(bits>>>i)&1;
      /* vertical: (i,8) i=0..5; (i+1,8) i=6,7; (size-15+i,8) i=8..14 */
      if(i<6) m[i][8]=mod;
      else if(i<8) m[i+1][8]=mod;
      else m[size-15+i][8]=mod;
      /* horizontal: (8,size-1-i) i=0..7; (8,15-i) i=8; (8,14-i) i=9..14 */
      if(i<8) m[8][size-i-1]=mod;
      else if(i<9) m[8][15-i-1+1]=mod;
      else m[8][15-i-1]=mod;
    }
    m[size-8][8]=1; /* dark module 保持 */
  }

  /* 掩码惩罚（规则1-4） */
  function penalty(m){
    var size=m.length, score=0, r, c, i;
    for(r=0;r<size;r++){
      var run=1, prev=m[r][0];
      for(c=1;c<size;c++){
        if(m[r][c]===prev) run++; else { if(run>=5) score+=3+(run-5); run=1; prev=m[r][c]; }
      }
      if(run>=5) score+=3+(run-5);
    }
    for(c=0;c<size;c++){
      var run2=1, prev2=m[0][c];
      for(r=1;r<size;r++){
        if(m[r][c]===prev2) run2++; else { if(run2>=5) score+=3+(run2-5); run2=1; prev2=m[r][c]; }
      }
      if(run2>=5) score+=3+(run2-5);
    }
    for(r=0;r<size-1;r++) for(c=0;c<size-1;c++){
      var v=m[r][c];
      if(m[r][c+1]===v&&m[r+1][c]===v&&m[r+1][c+1]===v) score+=3;
    }
    for(r=0;r<size;r++) for(c=0;c<size-10;c++){
      var seq='';
      for(i=0;i<11;i++) seq+=m[r][c+i];
      if(seq.indexOf('10111010000')===0||seq.indexOf('00001011101')===0) score+=40;
    }
    for(c=0;c<size;c++) for(r=0;r<size-10;r++){
      var seq2='';
      for(i=0;i<11;i++) seq2+=m[r+i][c];
      if(seq2.indexOf('10111010000')===0||seq2.indexOf('00001011101')===0) score+=40;
    }
    var dark=0;
    for(r=0;r<size;r++) for(c=0;c<size;c++) dark+=m[r][c];
    var pct=Math.abs(100*dark/(size*size)-50)/5;
    score+=pct*10;
    return score;
  }

  /* ---------- 对外 API ---------- */
  function toMatrix(text){
    var enc=encodeData(text);
    if(!enc) return null;
    var ver=enc.ver, groups=RS_TABLE[ver];
    /* 按 n 展开块配置 */
    var blocks=[];
    for(var gi=0;gi<groups.length;gi++) for(var ni=0;ni<groups[gi].n;ni++) blocks.push({d:groups[gi].d, t:groups[gi].t});
    var blen=blocks.length;
    /* 数据码字分块 + RS */
    var blkData=[], blkEcc=[], dCursor=0;
    for(var bi=0;bi<blen;bi++){
      var d=enc.data.slice(dCursor, dCursor+blocks[bi].d);
      dCursor+=blocks[bi].d;
      blkData.push(d);
      blkEcc.push(rsEncode(d, blocks[bi].t-blocks[bi].d));
    }
    /* 交织：数据区逐块逐位，ECC 区逐块逐位 */
    var inter=[], maxD=0;
    for(var b3=0;b3<blen;b3++) if(blkData[b3].length>maxD) maxD=blkData[b3].length;
    for(var i2=0;i2<maxD;i2++) for(var k=0;k<blen;k++) if(i2<blkData[k].length) inter.push(blkData[k][i2]);
    var eccLen=blocks[0].t-blocks[0].d;
    for(var j=0;j<eccLen;j++) for(var k2=0;k2<blen;k2++) inter.push(blkEcc[k2][j]);

    /* 8 掩码选优（画上 format 后惩罚） */
    var best=null, bestScore=Infinity;
    for(var mk=0;mk<8;mk++){
      var mm2=buildMatrix(ver, inter, mk);
      drawFormat(mm2, mk);
      var sc2=penalty(mm2);
      if(sc2<bestScore){ bestScore=sc2; best=mm2; }
    }
    /* 静区 4 模块（上下左右对称） */
    var quiet=4, size=best.length+quiet*2, out=[];
    for(var r=0;r<quiet;r++) out.push(new Array(size).fill(0));
    for(var r=0;r<best.length;r++){
      var row=new Array(size).fill(0);
      for(var c=0;c<best.length;c++) row[c+quiet]=best[r][c];
      out.push(row);
    }
    for(var r=0;r<quiet;r++) out.push(new Array(size).fill(0));
    return out;
  }

  function toCanvas(cv, text, modulePx){
    var m=toMatrix(text); if(!m||!cv) return false;
    var size=m.length, px=modulePx||8;
    cv.width=size*px; cv.height=size*px;
    var ctx=cv.getContext('2d');
    ctx.fillStyle='#ffffff'; ctx.fillRect(0,0,cv.width,cv.height);
    ctx.fillStyle='#232230';
    for(var r=0;r<size;r++) for(var c=0;c<size;c++) if(m[r][c]) ctx.fillRect(c*px,r*px,px,px);
    return true;
  }

  return { toMatrix:toMatrix, toCanvas:toCanvas, maxBytes:MAX_BYTES };
})();
if(typeof module!=='undefined'&&module.exports) module.exports=QR_GEN;
