
if(!window['RCal']){
	window['RCal'] = { };
}
RCal.baseRate = [{"term":[0,12],"rate":4.35,"text":"1\u5e74\u4ee5\u5185(\u542b1\u5e74)"},{"term":[12,60],"rate":4.75,"text":"1\u5e74\u52305\u5e74(\u542b5\u5e74)"},{"term":[60,1000],"rate":4.9,"text":"5\u5e74\u4ee5\u4e0a"}];
RCal.baseRateGjj = [{"term":[0,60],"rate":2.75,"text":"5\u5e74\u4ee5\u5185(\u542b5\u5e74)"},{"term":[60,1000],"rate":3.25,"text":"5\u5e74\u4ee5\u4e0a"}];
RCal.baseRateCunkuan = [{"term":0,"rate":0.35,"text":"\u6d3b\u671f"},{"term":3,"rate":1.1,"text":"3\u4e2a\u6708\u5b9a\u671f"},{"term":6,"rate":1.3,"text":"6\u4e2a\u6708\u5b9a\u671f"},{"term":12,"rate":1.5,"text":"1\u5e74\u5b9a\u671f"},{"term":24,"rate":2.1,"text":"2\u5e74\u5b9a\u671f"},{"term":36,"rate":2.75,"text":"3\u5e74\u5b9a\u671f"}];

RCal.getSdLilv = function(qx, bs){
	var lilv;
	for(var i=0, len = RCal.baseRate.length; i<len; i++){
		var item = RCal.baseRate[i];
		if(qx > item.term[0] && qx <= item.term[1]){
			lilv = item.rate;
			break;
		}
	}
	return (lilv * bs).toFixed(2);
};

RCal.getGjjLilv = function(qx, bs){
	var lilv;
	for(var i=0, len = RCal.baseRateGjj.length; i<len; i++){
		var item = RCal.baseRateGjj[i];
		if(qx > item.term[0] && qx <= item.term[1]){
			lilv = item.rate;
			break;
		}
	}
	return (lilv * bs).toFixed(2);
};

RCal.getLilv = function(qx, bs){
	if(bs.indexOf('gjj-1') == 0){
		bs = parseFloat(bs.replace('gjj-', ''));
		return RCal.getGjjLilv(qx, bs);
	}else{
		return RCal.getSdLilv(qx, bs);
	}
}

RCal.getCunkuanLilv = function(qx){
	var baseRateCunkuan = RCal.baseRateCunkuan;	
	for(var i=0,len=baseRateCunkuan.length; i<len; i++){
		var item = baseRateCunkuan[i];
		if(qx == item.term){
			return item.rate;
		}	
	}
	return baseRateCunkuan[baseRateCunkuan.length - 1].rate;
}




function cal_lv() {
    var e = 12 * $("#qixian").val()
      , l = $("#lilv-bs");
    if (l.length > 0) {
        var a = l.val();
        $("#lilv-value").val(RCal.getSdLilv(e, a))
    }
    var t = $("#lilv");
    if (t.length > 0) {
        var i, a = t.val();
        i = $(".field-gjj-lv").length > 0 ? RCal.getGjjLilv(e, a) : RCal.getSdLilv(e, a),
        $("#lilv-value").val(i)
    }
    var r = $("#sdlilv");
    if (r.length > 0) {
        var a = r.val();
        $("#sd-lilv-value").val(RCal.getSdLilv(e, a))
    }
    var v = $("#gjjlilv");
    if (v.length > 0) {
        var a = v.val();
        $("#gjj-lilv-value").val(RCal.getGjjLilv(e, a))
    }
}
function saveResult() {
    var e = $("#email");
    return email = e.val(),
    form = $("#save-result-form"),
    $imgcode = $("#ImgCode"),
    /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)*\.[\w]{2,3}$/.test(email) ? void $.ajax({
        type: "POST",
        url: "/fangdai/saveCalResult",
        data: form.serializeArray(),
        success: function(l) {
            switch (1 * l) {
            case 2:
                alert("请输入正确的邮箱地址"),
                e.addClass("error").focus();
                break;
            case 4:
                alert("请输入正确的验证码"),
                $imgcode.attr("src", ImgCodeSrc + "&t=" + (new Date).getTime());
                break;
            default:
                alert("计算结果已经发送至您的邮箱(" + email + ")。"),
                $imgcode.attr("src", ImgCodeSrc + "&t=" + (new Date).getTime())
            }
        }
    }) : (alert("请输入正确的邮箱地址"),
    void e.addClass("error").focus())
}
function goCalc() {
    var e, l, a, t, i, r;
    if ($("#sdje").length > 0) {
        var v = calZh();
        if (!v)
            return;
        e = v.je,
        a = v.qx,
        t = v.debx,
        i = v.debj,
        input = v.input
    } else {
        if ("2" == $("#method").val()) {
            var n, s, o;
            if (n = parseFloat($("#price").val()),
            isNaN(n))
                return void $("#price").val("").focus();
            if (s = parseFloat($("#area").val()),
            isNaN(s))
                return void $("#area").val("").focus();
            o = parseFloat($("#shoufu").val()),
            r = n * s,
            e = r * (1 - .1 * o),
            r += "元"
        } else {
            var r = parseFloat($("#dkje").val());
            if (isNaN(r))
                return void $("#dkje").val("").focus();
            e = 1e4 * r,
            r += "万元"
        }
        if (l = parseFloat($("#lilv-value").val()),
        isNaN(l))
            return void $("#lilv-value").val("").focus();
        a = 12 * parseFloat($("#qixian").val()),
        t = debx(e, l, a, 1, 1),
        i = debj(e, l, a, 1, 1),
        input = {
            je_input: r,
            lilv: l
        }
    }
    return {
        errno: 0,
        input: input,
        data: {
            debx_dkje: fmoney(e, 2),
            debx_dkqx: a,
            debx_myhk: fmoney(t.yhk, 2),
            debx_zflx: fmoney(t.zlx, 2),
            debx_hkze: fmoney(t.hkze, 2),
            debj_dkje: fmoney(e, 2),
            debj_dkqx: a,
            debj_syhk: fmoney(i.syhk, 2),
            debj_mydj: fmoney(i.mydj, 2),
            debj_zflx: fmoney(i.zlx, 2),
            debj_hkze: fmoney(i.hkze, 2)
        }
    }
}
function calZh() {
    var e = parseFloat($("#sdje").val());
    if (gjj_je = parseFloat($("#gjjje").val()),
    sdlilv = parseFloat($("#sd-lilv-value").val()),
    gjjlilv = parseFloat($("#gjj-lilv-value").val()),
    qx = 12 * parseFloat($("#qixian").val()),
    isNaN(e))
        return $("#sdje").val("").focus(),
        !1;
    if (isNaN(gjj_je))
        return $("#gjjje").val("").focus(),
        !1;
    sdje = 1e4 * e,
    gjjje = 1e4 * gjj_je;
    var l = debx(sdje, sdlilv, qx, 1, 1)
      , a = debj(sdje, sdlilv, qx, 1, 1)
      , t = debx(gjjje, gjjlilv, qx, 1, 1)
      , i = debj(gjjje, gjjlilv, qx, 1, 1);
    return {
        je: sdje + gjjje,
        qx: qx,
        input: {
            sy_je: e,
            gjj_je: gjj_je,
            sy_lv: sdlilv,
            gjj_lv: gjjlilv
        },
        debx: {
            yhk: l.yhk + t.yhk,
            zlx: l.zlx + t.zlx,
            hkze: l.hkze + t.hkze
        },
        debj: {
            syhk: a.syhk + i.syhk,
            mydj: a.mydj + i.mydj,
            zlx: a.zlx + i.zlx,
            hkze: a.hkze + i.hkze
        }
    }
}
function fmoney(e, l) {
    l = l > 0 && 20 >= l ? l : 2,
    e = parseFloat((e + "").replace(/[^\d\.-]/g, "")).toFixed(l) + "";
    var a = e.split(".")[0].split("").reverse()
      , r = e.split(".")[1];
    for (t = "",
    i = 0; i < a.length; i++)
        t += a[i] + ((i + 1) % 3 == 0 && i + 1 != a.length ? "," : "");
    return t.split("").reverse().join("") + "." + r
}
function debx(e, l, a, t, r) {
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
        for (i = 1; a >= i; i++) {
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
}
function debj(e, l, a, t, r) {
    a = parseInt(a),
    e = parseFloat(e),
    l = parseFloat(l),
    t = parseInt(t),
    r = parseInt(r),
    ylv = 2 == t ? .01 * l : l / 12 * .01;
    var v = 0
      , n = e / a
      , s = new Object;
    s.ybj = n;
    var o = e
      , d = [];
    for (i = 1; a >= i; i++) {
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
}
function esfsf(e, l, a, t) {
    e = parseInt(e),
    l = parseInt(l),
    a = parseFloat(a),
    t = parseFloat(t);
    var i = 0;
    i = 2 == e ? 3 : a > 90 ? 1.5 : 1;
    var r = t * i / 100
      , v = 0;
    0 == l && (v = 5.55);
    var n = t * v / 100
      , s = .07 * n
      , o = .03 * n
      , d = .01 * t
      , j = 0
      , c = new Object;
    return c.qs = r,
    c.yys = n,
    c.cjs = s,
    c.jyfjf = o,
    c.grsds = d,
    c.yhs = j,
    c.total = r + n + s + o + d + j,
    c
}
function show_err(e, l, a) {
    if (0 == $("#" + e + "_err").length) {
        var t = $("#" + e).offset().top
          , i = $("#" + e).offset().left
          , r = ($("#" + e).height(),
        $("#" + e).width())
          , v = 0;
        v = a && parseInt(a) > 0 ? a : 0;
        var n = '<div id="' + e + '_err" class="err" style="left:' + (i + r + 20 + v) + "px;top:" + t + 'px;"><div class="con">' + l + '</div><div class="arr"></div><div style="clear:both"></div></div>';
        $(n).appendTo(document.body)
    }
}
$(function() {
    MW.define("calc-input", function(e) {
        e.active = function() {
            $.log({
                page_name: pagename,
                ext: "fangdai"
            }),
            $("[data-event='tap:cal']").on("click", function() {
                var e = goCalc();
                0 == e.errno && (MW.goTo("#/calc_result"),
                MW.getView("calc_result").model("calc_result", e))
            })
        }
        ,
        e.event = {}
    }),
    MW.define("calc_result", function(e) {
        e.active = function() {
            ImgCodeSrc = $("#ImgCode").attr("data-src"),
            $("#ImgCode").attr("src", ImgCodeSrc + "&t=" + (new Date).getTime()),
            $("#ImgCode").on("touchend", function() {
                $(this).attr("src", ImgCodeSrc + "&t=" + (new Date).getTime())
            })
        }
        ,
        e.event = {
            "tap:send": function() {
                saveResult()
            }
        }
    }),
    $("#lilv, #lilv-bs, #sdlilv, #gjjlilv, #qixian").on("change", function() {
        cal_lv()
    }),
    $("#lilv, #lilv-bs, #sdlilv, #gjjlilv").on("focus", function() {
        cal_lv()
    }),
    $(".op2").hide(),
    $("#method").on("change", function() {
        $(".op1").toggle(),
        $(".op2").toggle()
    }),
    $("#xingzhi").on("change", function() {
        "1" == $(this).val() ? ($("#shoufu").val("3"),
        $("#shoufu-bar").html("3成").attr("value", 3)) : ($("#shoufu").val("6"),
        $("#shoufu-bar").html("6成").attr("value", 6))
    })
});
