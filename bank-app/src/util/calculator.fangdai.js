/**
 * 房贷计算基准利率
 */
let FDCalc = {
  // 商业贷款基准利率
  baseRate: [{
    term: [0, 12],
    rate: 4.35,
    text: '1\u5e74\u4ee5\u5185(\u542b1\u5e74)'
  }, {
    term: [12, 60],
    rate: 4.75,
    text: '1\u5e74\u52305\u5e74(\u542b5\u5e74)'
  }, {
    term: [60, 1000],
    rate: 4.9,
    text: '5\u5e74\u4ee5\u4e0a'
  }],

  // 公积金贷款基准利率
  baseRateGjj: [{
    term: [0, 60],
    rate: 2.75,
    text: '5\u5e74\u4ee5\u5185(\u542b5\u5e74)'
  },{
    term: [60, 1000],
    rate: 3.25,
    text: '5\u5e74\u4ee5\u4e0a'
  }],

  /**
   * 计算商业贷款利率
   * @param {Number} qx 贷款期限
   * @param {Number} bs 商业贷款利率
   */
  getSdLilv(qx, bs) {
    let lilv = 0;
    for (let i = 0, len = this.baseRate.length; i < len; i++) {
      let item = this.baseRate[i];
      if (qx > item.term[0] && qx <= item.term[1]) {
        lilv = item.rate;
        break;
      }
    }
    return (lilv * bs).toFixed(2);
  },
  
  /**
   * 计算公积金贷款利率
   * @param {Number} qx 贷款期限
   * @param {Number} bs 公积金贷款利率
   */
  getGjjLilv(qx, bs) {
    let lilv = 0;
    for (let i = 0, len = this.baseRateGjj.length; i < len; i++) {
      let item = this.baseRateGjj[i];
      if (qx > item.term[0] && qx <= item.term[1]) {
        lilv = item.rate;
        break;
      }
    }
    return (lilv * bs).toFixed(2);
  },

  /**
   * 计算利率
   * @param {Number} qx 贷款期限
   * @param {Number} bs 贷款利率
   * @returns 
   */
  getLilv(qx, bs) {
    if(bs.indexOf('gjj-1') == 0) {
      bs = parseFloat(bs.replace('gjj-', ''));
      return this.getGjjLilv(qx, bs);
    } else{
      return this.getSdLilv(qx, bs);
    }
  },

  debx(e, l, a, t, r) {
  var 
    a = parseInt(a),
    e = parseFloat(e),
    l = parseFloat(l),
    t = parseInt(t),
    r = parseInt(r),
    ylv = 2 == t ? .01 * l : l / 12 * .01;
    var v = Math.pow(1 + ylv, a)
      , n = e * ylv * (v / (v - 1))
      , s = n * a
      , o = s - e
      , d = new Object;
    if (d.zlx = o,
    d.hkze = s,
    d.yhk = n,
    1 == r) {
        var j = e
          , c = [];
        for (var i = 1; a >= i; i++) {
            var u = j * ylv
              , f = n - u;
            j -= f;
            var g = new Object;
            g.bh = i,
            g.ylx = u,
            g.ybj = f,
            g.ye = j,
            c[i - 1] = g
        }
        d.xx = c
    }
    return d
  },
  debj(e, l, a, t, r) {
    var 
    a = parseInt(a),
    e = parseFloat(e),
    l = parseFloat(l),
    t = parseInt(t),
    r = parseInt(r),
    ylv = 2 == t ? .01 * l : l / 12 * .01;
    var v = 0
      , n = e / a
      , s = new Object;
    
    var yhk,ylx;
    s.ybj = n;
    var o = e
      , d = [];
    for (var i = 1; a >= i; i++) {
        yhk = e / a + (e - e * (i - 1) / a) * ylv,
        1 == i && (s.syhk = yhk),
        2 == i && (s.mydj = s.syhk - yhk),
        v += yhk,
        ylx = yhk - n,
        o -= n;
        var j = new Object;
        j.bh = i,
        j.ylx = ylx,
        j.yhk = yhk,
        j.ye = o,
        d[i - 1] = j
    }
    return 1 == r && (s.xx = d),
    s.zlx = v - e,
    s.hkze = v,
    s
  },
  fmoney(e, l) {
    l = l > 0 && 20 >= l ? l : 2,
    e = parseFloat((e + '').replace(/[^\d\.-]/g, '')).toFixed(l) + '';
    var a = e.split('.')[0].split('').reverse()
      , r = e.split('.')[1];
    var t,i;
    for (t = '',
    i = 0; i < a.length; i++)
        t += a[i] + ((i + 1) % 3 == 0 && i + 1 != a.length ? ',' : '');
    return t.split('').reverse().join('') + '.' + r;
  },
  calcZh(sdje, gjjje, sdLilvValue, gjjLilvValue, qixian) {
    sdje = parseFloat(sdje);
    gjjje = parseFloat(gjjje);
    sdLilvValue = parseFloat(sdLilvValue);
    gjjLilvValue = parseFloat(gjjLilvValue);
    qixian = parseFloat(qixian) * 12;
    if (isNaN(sdje)) {
      return;
    } 
    if (isNaN(gjjje)) {
      return;
    }
    sdje = 1e4 * sdje;
    gjjje = 1e4 * gjjje;
    let sdlv = this.debx(sdje, sdLilvValue, qixian, 1, 1);
    let sdbj = this.debj(sdje, sdLilvValue, qixian, 1, 1);
    let gjjlv = this.debx(gjjje, gjjLilvValue, qixian, 1, 1);
    let gjjbj = this.debj(gjjje, gjjLilvValue, qixian, 1, 1);
    return {
      je: sdje + gjjje,
      qixian: qixian,
      input: {
        syje: sdje,
        gjjje: gjjje,
        sylv: sdLilvValue,
        gjjlv: gjjLilvValue
      },
      debx: {
        yhk: sdlv.yhk + gjjlv.yhk,
        zlx: sdlv.zlx + gjjlv.zlx,
        hkze: sdlv.hkze + gjjlv.hkze
      },
      debj: {
        syhk: sdbj.syhk + gjjbj.syhk,
        mydj: sdbj.mydj + gjjbj.mydj,
        zlx: sdbj.zlx + gjjbj.zlx,
        hkze: sdbj.hkze + gjjbj.hkze
      }
    };
  }
};

export default FDCalc;

