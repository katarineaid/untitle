/*! version : 4.14.30
 =========================================================
 bootstrap-datetimejs
 https://github.com/Eonasdan/bootstrap-datetimepicker
 Copyright (c) 2015 Jonathan Peterson
 =========================================================
 */
!function (a) {
  "use strict";
  if ("function" == typeof define && define.amd) define(["jquery", "moment"], a);else if ("object" == typeof exports) a(require("jquery"), require("moment"));else {
    if ("undefined" == typeof jQuery) throw "bootstrap-datetimepicker requires jQuery to be loaded first";if ("undefined" == typeof moment) throw "bootstrap-datetimepicker requires Moment.js to be loaded first";a(jQuery, moment);
  }
}(function (a, b) {
  "use strict";
  if (!b) throw new Error("bootstrap-datetimepicker requires Moment.js to be loaded first");var c = function (c, d) {
    var e,
        f,
        g,
        h,
        i,
        j = {},
        k = b().startOf("d"),
        l = k.clone(),
        m = !0,
        n = !1,
        o = !1,
        p = 0,
        q = [{ clsName: "days", navFnc: "M", navStep: 1 }, { clsName: "months", navFnc: "y", navStep: 1 }, { clsName: "years", navFnc: "y", navStep: 10 }, { clsName: "decades", navFnc: "y", navStep: 100 }],
        r = ["days", "months", "years", "decades"],
        s = ["top", "bottom", "auto"],
        t = ["left", "right", "auto"],
        u = ["default", "top", "bottom"],
        v = { up: 38, 38: "up", down: 40, 40: "down", left: 37, 37: "left", right: 39, 39: "right", tab: 9, 9: "tab", escape: 27, 27: "escape", enter: 13, 13: "enter", pageUp: 33, 33: "pageUp", pageDown: 34, 34: "pageDown", shift: 16, 16: "shift", control: 17, 17: "control", space: 32, 32: "space", t: 84, 84: "t", "delete": 46, 46: "delete" },
        w = {},
        x = function (a) {
      if ("string" != typeof a || a.length > 1) throw new TypeError("isEnabled expects a single character string parameter");switch (a) {case "y":
          return -1 !== g.indexOf("Y");case "M":
          return -1 !== g.indexOf("M");case "d":
          return -1 !== g.toLowerCase().indexOf("d");case "h":case "H":
          return -1 !== g.toLowerCase().indexOf("h");case "m":
          return -1 !== g.indexOf("m");case "s":
          return -1 !== g.indexOf("s");default:
          return !1;}
    },
        y = function () {
      return x("h") || x("m") || x("s");
    },
        z = function () {
      return x("y") || x("M") || x("d");
    },
        A = function () {
      var b = a("<thead>").append(a("<tr>").append(a("<th>").addClass("prev").attr("data-action", "previous").append(a("<span>").addClass(d.icons.previous))).append(a("<th>").addClass("picker-switch").attr("data-action", "pickerSwitch").attr("colspan", d.calendarWeeks ? "6" : "5")).append(a("<th>").addClass("next").attr("data-action", "next").append(a("<span>").addClass(d.icons.next)))),
          c = a("<tbody>").append(a("<tr>").append(a("<td>").attr("colspan", d.calendarWeeks ? "8" : "7")));return [a("<div>").addClass("datepicker-days").append(a("<table>").addClass("table-condensed").append(b).append(a("<tbody>"))), a("<div>").addClass("datepicker-months").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())), a("<div>").addClass("datepicker-years").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone())), a("<div>").addClass("datepicker-decades").append(a("<table>").addClass("table-condensed").append(b.clone()).append(c.clone()))];
    },
        B = function () {
      var b = a("<tr>"),
          c = a("<tr>"),
          e = a("<tr>");return x("h") && (b.append(a("<td>").append(a("<a>").attr({ href: "#", tabindex: "-1", title: "Increment Hour" }).addClass("btn").attr("data-action", "incrementHours").append(a("<span>").addClass(d.icons.up)))), c.append(a("<td>").append(a("<span>").addClass("timepicker-hour").attr({ "data-time-component": "hours", title: "Pick Hour" }).attr("data-action", "showHours"))), e.append(a("<td>").append(a("<a>").attr({ href: "#", tabindex: "-1", title: "Decrement Hour" }).addClass("btn").attr("data-action", "decrementHours").append(a("<span>").addClass(d.icons.down))))), x("m") && (x("h") && (b.append(a("<td>").addClass("separator")), c.append(a("<td>").addClass("separator").html(":")), e.append(a("<td>").addClass("separator"))), b.append(a("<td>").append(a("<a>").attr({ href: "#", tabindex: "-1", title: "Increment Minute" }).addClass("btn").attr("data-action", "incrementMinutes").append(a("<span>").addClass(d.icons.up)))), c.append(a("<td>").append(a("<span>").addClass("timepicker-minute").attr({ "data-time-component": "minutes", title: "Pick Minute" }).attr("data-action", "showMinutes"))), e.append(a("<td>").append(a("<a>").attr({ href: "#", tabindex: "-1", title: "Decrement Minute" }).addClass("btn").attr("data-action", "decrementMinutes").append(a("<span>").addClass(d.icons.down))))), x("s") && (x("m") && (b.append(a("<td>").addClass("separator")), c.append(a("<td>").addClass("separator").html(":")), e.append(a("<td>").addClass("separator"))), b.append(a("<td>").append(a("<a>").attr({ href: "#", tabindex: "-1", title: "Increment Second" }).addClass("btn").attr("data-action", "incrementSeconds").append(a("<span>").addClass(d.icons.up)))), c.append(a("<td>").append(a("<span>").addClass("timepicker-second").attr({ "data-time-component": "seconds", title: "Pick Second" }).attr("data-action", "showSeconds"))), e.append(a("<td>").append(a("<a>").attr({ href: "#", tabindex: "-1", title: "Decrement Second" }).addClass("btn").attr("data-action", "decrementSeconds").append(a("<span>").addClass(d.icons.down))))), f || (b.append(a("<td>").addClass("separator")), c.append(a("<td>").append(a("<button>").addClass("btn btn-primary").attr({ "data-action": "togglePeriod", tabindex: "-1", title: "Toggle Period" }))), e.append(a("<td>").addClass("separator"))), a("<div>").addClass("timepicker-picker").append(a("<table>").addClass("table-condensed").append([b, c, e]));
    },
        C = function () {
      var b = a("<div>").addClass("timepicker-hours").append(a("<table>").addClass("table-condensed")),
          c = a("<div>").addClass("timepicker-minutes").append(a("<table>").addClass("table-condensed")),
          d = a("<div>").addClass("timepicker-seconds").append(a("<table>").addClass("table-condensed")),
          e = [B()];return x("h") && e.push(b), x("m") && e.push(c), x("s") && e.push(d), e;
    },
        D = function () {
      var b = [];return d.showTodayButton && b.push(a("<td>").append(a("<a>").attr({ "data-action": "today", title: "Go to today" }).append(a("<span>").addClass(d.icons.today)))), !d.sideBySide && z() && y() && b.push(a("<td>").append(a("<a>").attr({ "data-action": "togglePicker", title: "Select Time" }).append(a("<span>").addClass(d.icons.time)))), d.showClear && b.push(a("<td>").append(a("<a>").attr({ "data-action": "clear", title: "Clear selection" }).append(a("<span>").addClass(d.icons.clear)))), d.showClose && b.push(a("<td>").append(a("<a>").attr({ "data-action": "close", title: "Close the picker" }).append(a("<span>").addClass(d.icons.close)))), a("<table>").addClass("table-condensed").append(a("<tbody>").append(a("<tr>").append(b)));
    },
        E = function () {
      var b = a("<div>").addClass("bootstrap-datetimepicker-widget dropdown-menu"),
          c = a("<div>").addClass("datepicker").append(A()),
          e = a("<div>").addClass("timepicker").append(C()),
          g = a("<ul>").addClass("list-unstyled"),
          h = a("<li>").addClass("picker-switch" + (d.collapse ? " accordion-toggle" : "")).append(D());return d.inline && b.removeClass("dropdown-menu"), f && b.addClass("usetwentyfour"), x("s") && !f && b.addClass("wider"), d.sideBySide && z() && y() ? (b.addClass("timepicker-sbs"), b.append(a("<div>").addClass("row").append(c.addClass("col-sm-6")).append(e.addClass("col-sm-6"))), b.append(h), b) : ("top" === d.toolbarPlacement && g.append(h), z() && g.append(a("<li>").addClass(d.collapse && y() ? "collapse in" : "").append(c)), "default" === d.toolbarPlacement && g.append(h), y() && g.append(a("<li>").addClass(d.collapse && z() ? "collapse" : "").append(e)), "bottom" === d.toolbarPlacement && g.append(h), b.append(g));
    },
        F = function () {
      var b,
          e = {};return b = c.is("input") || d.inline ? c.data() : c.find("input").data(), b.dateOptions && b.dateOptions instanceof Object && (e = a.extend(!0, e, b.dateOptions)), a.each(d, function (a) {
        var c = "date" + a.charAt(0).toUpperCase() + a.slice(1);void 0 !== b[c] && (e[a] = b[c]);
      }), e;
    },
        G = function () {
      var b,
          e = (n || c).position(),
          f = (n || c).offset(),
          g = d.widgetPositioning.vertical,
          h = d.widgetPositioning.horizontal;if (d.widgetParent) b = d.widgetParent.append(o);else if (c.is("input")) b = c.after(o).parent();else {
        if (d.inline) return void (b = c.append(o));b = c, c.children().first().after(o);
      }if ("auto" === g && (g = f.top + 1.5 * o.height() >= a(window).height() + a(window).scrollTop() && o.height() + c.outerHeight() < f.top ? "top" : "bottom"), "auto" === h && (h = b.width() < f.left + o.outerWidth() / 2 && f.left + o.outerWidth() > a(window).width() ? "right" : "left"), "top" === g ? o.addClass("top").removeClass("bottom") : o.addClass("bottom").removeClass("top"), "right" === h ? o.addClass("pull-right") : o.removeClass("pull-right"), "relative" !== b.css("position") && (b = b.parents().filter(function () {
        return "relative" === a(this).css("position");
      }).first()), 0 === b.length) throw new Error("datetimepicker component should be placed within a relative positioned container");o.css({ top: "top" === g ? "auto" : e.top + c.outerHeight(), bottom: "top" === g ? e.top + c.outerHeight() : "auto", left: "left" === h ? b === c ? 0 : e.left : "auto", right: "left" === h ? "auto" : b.outerWidth() - c.outerWidth() - (b === c ? 0 : e.left) });
    },
        H = function (a) {
      "dp.change" === a.type && (a.date && a.date.isSame(a.oldDate) || !a.date && !a.oldDate) || c.trigger(a);
    },
        I = function (a) {
      "y" === a && (a = "YYYY"), H({ type: "dp.update", change: a, viewDate: l.clone() });
    },
        J = function (a) {
      o && (a && (i = Math.max(p, Math.min(3, i + a))), o.find(".datepicker > div").hide().filter(".datepicker-" + q[i].clsName).show());
    },
        K = function () {
      var b = a("<tr>"),
          c = l.clone().startOf("w").startOf("d");for (d.calendarWeeks === !0 && b.append(a("<th>").addClass("cw").text("#")); c.isBefore(l.clone().endOf("w"));) b.append(a("<th>").addClass("dow").text(c.format("dd"))), c.add(1, "d");o.find(".datepicker-days thead").append(b);
    },
        L = function (a) {
      return d.disabledDates[a.format("YYYY-MM-DD")] === !0;
    },
        M = function (a) {
      return d.enabledDates[a.format("YYYY-MM-DD")] === !0;
    },
        N = function (a) {
      return d.disabledHours[a.format("H")] === !0;
    },
        O = function (a) {
      return d.enabledHours[a.format("H")] === !0;
    },
        P = function (b, c) {
      if (!b.isValid()) return !1;if (d.disabledDates && "d" === c && L(b)) return !1;if (d.enabledDates && "d" === c && !M(b)) return !1;if (d.minDate && b.isBefore(d.minDate, c)) return !1;if (d.maxDate && b.isAfter(d.maxDate, c)) return !1;if (d.daysOfWeekDisabled && "d" === c && -1 !== d.daysOfWeekDisabled.indexOf(b.day())) return !1;if (d.disabledHours && ("h" === c || "m" === c || "s" === c) && N(b)) return !1;if (d.enabledHours && ("h" === c || "m" === c || "s" === c) && !O(b)) return !1;if (d.disabledTimeIntervals && ("h" === c || "m" === c || "s" === c)) {
        var e = !1;if (a.each(d.disabledTimeIntervals, function () {
          return b.isBetween(this[0], this[1]) ? (e = !0, !1) : void 0;
        }), e) return !1;
      }return !0;
    },
        Q = function () {
      for (var b = [], c = l.clone().startOf("y").startOf("d"); c.isSame(l, "y");) b.push(a("<span>").attr("data-action", "selectMonth").addClass("month").text(c.format("MMM"))), c.add(1, "M");o.find(".datepicker-months td").empty().append(b);
    },
        R = function () {
      var b = o.find(".datepicker-months"),
          c = b.find("th"),
          d = b.find("tbody").find("span");c.eq(0).find("span").attr("title", "Previous Year"), c.eq(1).attr("title", "Select Year"), c.eq(2).find("span").attr("title", "Next Year"), b.find(".disabled").removeClass("disabled"), P(l.clone().subtract(1, "y"), "y") || c.eq(0).addClass("disabled"), c.eq(1).text(l.year()), P(l.clone().add(1, "y"), "y") || c.eq(2).addClass("disabled"), d.removeClass("active"), k.isSame(l, "y") && !m && d.eq(k.month()).addClass("active"), d.each(function (b) {
        P(l.clone().month(b), "M") || a(this).addClass("disabled");
      });
    },
        S = function () {
      var a = o.find(".datepicker-years"),
          b = a.find("th"),
          c = l.clone().subtract(5, "y"),
          e = l.clone().add(6, "y"),
          f = "";for (b.eq(0).find("span").attr("title", "Previous Decade"), b.eq(1).attr("title", "Select Decade"), b.eq(2).find("span").attr("title", "Next Decade"), a.find(".disabled").removeClass("disabled"), d.minDate && d.minDate.isAfter(c, "y") && b.eq(0).addClass("disabled"), b.eq(1).text(c.year() + "-" + e.year()), d.maxDate && d.maxDate.isBefore(e, "y") && b.eq(2).addClass("disabled"); !c.isAfter(e, "y");) f += '<span data-action="selectYear" class="year' + (c.isSame(k, "y") && !m ? " active" : "") + (P(c, "y") ? "" : " disabled") + '">' + c.year() + "</span>", c.add(1, "y");a.find("td").html(f);
    },
        T = function () {
      var a = o.find(".datepicker-decades"),
          c = a.find("th"),
          e = b(l.isBefore(b({ y: 1999 })) ? { y: 1899 } : { y: 1999 }),
          f = e.clone().add(100, "y"),
          g = "";for (c.eq(0).find("span").attr("title", "Previous Century"), c.eq(2).find("span").attr("title", "Next Century"), a.find(".disabled").removeClass("disabled"), (e.isSame(b({ y: 1900 })) || d.minDate && d.minDate.isAfter(e, "y")) && c.eq(0).addClass("disabled"), c.eq(1).text(e.year() + "-" + f.year()), (e.isSame(b({ y: 2e3 })) || d.maxDate && d.maxDate.isBefore(f, "y")) && c.eq(2).addClass("disabled"); !e.isAfter(f, "y");) g += '<span data-action="selectDecade" class="decade' + (e.isSame(k, "y") ? " active" : "") + (P(e, "y") ? "" : " disabled") + '" data-selection="' + (e.year() + 6) + '">' + (e.year() + 1) + " - " + (e.year() + 12) + "</span>", e.add(12, "y");g += "<span></span><span></span><span></span>", a.find("td").html(g);
    },
        U = function () {
      var c,
          e,
          f,
          g,
          h = o.find(".datepicker-days"),
          i = h.find("th"),
          j = [];if (z()) {
        for (i.eq(0).find("span").attr("title", "Previous Month"), i.eq(1).attr("title", "Select Month"), i.eq(2).find("span").attr("title", "Next Month"), h.find(".disabled").removeClass("disabled"), i.eq(1).text(l.format(d.dayViewHeaderFormat)), P(l.clone().subtract(1, "M"), "M") || i.eq(0).addClass("disabled"), P(l.clone().add(1, "M"), "M") || i.eq(2).addClass("disabled"), c = l.clone().startOf("M").startOf("w").startOf("d"), g = 0; 42 > g; g++) 0 === c.weekday() && (e = a("<tr>"), d.calendarWeeks && e.append('<td class="cw">' + c.week() + "</td>"), j.push(e)), f = "", c.isBefore(l, "M") && (f += " old"), c.isAfter(l, "M") && (f += " new"), c.isSame(k, "d") && !m && (f += " active"), P(c, "d") || (f += " disabled"), c.isSame(b(), "d") && (f += " today"), (0 === c.day() || 6 === c.day()) && (f += " weekend"), e.append('<td data-action="selectDay" data-day="' + c.format("L") + '" class="day' + f + '">' + c.date() + "</td>"), c.add(1, "d");h.find("tbody").empty().append(j), R(), S(), T();
      }
    },
        V = function () {
      var b = o.find(".timepicker-hours table"),
          c = l.clone().startOf("d"),
          d = [],
          e = a("<tr>");for (l.hour() > 11 && !f && c.hour(12); c.isSame(l, "d") && (f || l.hour() < 12 && c.hour() < 12 || l.hour() > 11);) c.hour() % 4 === 0 && (e = a("<tr>"), d.push(e)), e.append('<td data-action="selectHour" class="hour' + (P(c, "h") ? "" : " disabled") + '">' + c.format(f ? "HH" : "hh") + "</td>"), c.add(1, "h");b.empty().append(d);
    },
        W = function () {
      for (var b = o.find(".timepicker-minutes table"), c = l.clone().startOf("h"), e = [], f = a("<tr>"), g = 1 === d.stepping ? 5 : d.stepping; l.isSame(c, "h");) c.minute() % (4 * g) === 0 && (f = a("<tr>"), e.push(f)), f.append('<td data-action="selectMinute" class="minute' + (P(c, "m") ? "" : " disabled") + '">' + c.format("mm") + "</td>"), c.add(g, "m");b.empty().append(e);
    },
        X = function () {
      for (var b = o.find(".timepicker-seconds table"), c = l.clone().startOf("m"), d = [], e = a("<tr>"); l.isSame(c, "m");) c.second() % 20 === 0 && (e = a("<tr>"), d.push(e)), e.append('<td data-action="selectSecond" class="second' + (P(c, "s") ? "" : " disabled") + '">' + c.format("ss") + "</td>"), c.add(5, "s");b.empty().append(d);
    },
        Y = function () {
      var a,
          b,
          c = o.find(".timepicker span[data-time-component]");f || (a = o.find(".timepicker [data-action=togglePeriod]"), b = k.clone().add(k.hours() >= 12 ? -12 : 12, "h"), a.text(k.format("A")), P(b, "h") ? a.removeClass("disabled") : a.addClass("disabled")), c.filter("[data-time-component=hours]").text(k.format(f ? "HH" : "hh")), c.filter("[data-time-component=minutes]").text(k.format("mm")), c.filter("[data-time-component=seconds]").text(k.format("ss")), V(), W(), X();
    },
        Z = function () {
      o && (U(), Y());
    },
        $ = function (a) {
      var b = m ? null : k;return a ? (a = a.clone().locale(d.locale), 1 !== d.stepping && a.minutes(Math.round(a.minutes() / d.stepping) * d.stepping % 60).seconds(0), void (P(a) ? (k = a, l = k.clone(), e.val(k.format(g)), c.data("date", k.format(g)), m = !1, Z(), H({ type: "dp.change", date: k.clone(), oldDate: b })) : (d.keepInvalid || e.val(m ? "" : k.format(g)), H({ type: "dp.error", date: a })))) : (m = !0, e.val(""), c.data("date", ""), H({ type: "dp.change", date: !1, oldDate: b }), void Z());
    },
        _ = function () {
      var b = !1;return o ? (o.find(".collapse").each(function () {
        var c = a(this).data("collapse");return c && c.transitioning ? (b = !0, !1) : !0;
      }), b ? j : (n && n.hasClass("btn") && n.toggleClass("active"), o.hide(), a(window).off("resize", G), o.off("click", "[data-action]"), o.off("mousedown", !1), o.remove(), o = !1, H({ type: "dp.hide", date: k.clone() }), j)) : j;
    },
        aa = function () {
      $(null);
    },
        ba = { next: function () {
        var a = q[i].navFnc;l.add(q[i].navStep, a), U(), I(a);
      }, previous: function () {
        var a = q[i].navFnc;l.subtract(q[i].navStep, a), U(), I(a);
      }, pickerSwitch: function () {
        J(1);
      }, selectMonth: function (b) {
        var c = a(b.target).closest("tbody").find("span").index(a(b.target));l.month(c), i === p ? ($(k.clone().year(l.year()).month(l.month())), d.inline || _()) : (J(-1), U()), I("M");
      }, selectYear: function (b) {
        var c = parseInt(a(b.target).text(), 10) || 0;l.year(c), i === p ? ($(k.clone().year(l.year())), d.inline || _()) : (J(-1), U()), I("YYYY");
      }, selectDecade: function (b) {
        var c = parseInt(a(b.target).data("selection"), 10) || 0;l.year(c), i === p ? ($(k.clone().year(l.year())), d.inline || _()) : (J(-1), U()), I("YYYY");
      }, selectDay: function (b) {
        var c = l.clone();a(b.target).is(".old") && c.subtract(1, "M"), a(b.target).is(".new") && c.add(1, "M"), $(c.date(parseInt(a(b.target).text(), 10))), y() || d.keepOpen || d.inline || _();
      }, incrementHours: function () {
        var a = k.clone().add(1, "h");P(a, "h") && $(a);
      }, incrementMinutes: function () {
        var a = k.clone().add(d.stepping, "m");P(a, "m") && $(a);
      }, incrementSeconds: function () {
        var a = k.clone().add(1, "s");P(a, "s") && $(a);
      }, decrementHours: function () {
        var a = k.clone().subtract(1, "h");P(a, "h") && $(a);
      }, decrementMinutes: function () {
        var a = k.clone().subtract(d.stepping, "m");P(a, "m") && $(a);
      }, decrementSeconds: function () {
        var a = k.clone().subtract(1, "s");P(a, "s") && $(a);
      }, togglePeriod: function () {
        $(k.clone().add(k.hours() >= 12 ? -12 : 12, "h"));
      }, togglePicker: function (b) {
        var c,
            e = a(b.target),
            f = e.closest("ul"),
            g = f.find(".in"),
            h = f.find(".collapse:not(.in)");if (g && g.length) {
          if (c = g.data("collapse"), c && c.transitioning) return;g.collapse ? (g.collapse("hide"), h.collapse("show")) : (g.removeClass("in"), h.addClass("in")), e.is("span") ? e.toggleClass(d.icons.time + " " + d.icons.date) : e.find("span").toggleClass(d.icons.time + " " + d.icons.date);
        }
      }, showPicker: function () {
        o.find(".timepicker > div:not(.timepicker-picker)").hide(), o.find(".timepicker .timepicker-picker").show();
      }, showHours: function () {
        o.find(".timepicker .timepicker-picker").hide(), o.find(".timepicker .timepicker-hours").show();
      }, showMinutes: function () {
        o.find(".timepicker .timepicker-picker").hide(), o.find(".timepicker .timepicker-minutes").show();
      }, showSeconds: function () {
        o.find(".timepicker .timepicker-picker").hide(), o.find(".timepicker .timepicker-seconds").show();
      }, selectHour: function (b) {
        var c = parseInt(a(b.target).text(), 10);f || (k.hours() >= 12 ? 12 !== c && (c += 12) : 12 === c && (c = 0)), $(k.clone().hours(c)), ba.showPicker.call(j);
      }, selectMinute: function (b) {
        $(k.clone().minutes(parseInt(a(b.target).text(), 10))), ba.showPicker.call(j);
      }, selectSecond: function (b) {
        $(k.clone().seconds(parseInt(a(b.target).text(), 10))), ba.showPicker.call(j);
      }, clear: aa, today: function () {
        P(b(), "d") && $(b());
      }, close: _ },
        ca = function (b) {
      return a(b.currentTarget).is(".disabled") ? !1 : (ba[a(b.currentTarget).data("action")].apply(j, arguments), !1);
    },
        da = function () {
      var c,
          f = { year: function (a) {
          return a.month(0).date(1).hours(0).seconds(0).minutes(0);
        }, month: function (a) {
          return a.date(1).hours(0).seconds(0).minutes(0);
        }, day: function (a) {
          return a.hours(0).seconds(0).minutes(0);
        }, hour: function (a) {
          return a.seconds(0).minutes(0);
        }, minute: function (a) {
          return a.seconds(0);
        } };return e.prop("disabled") || !d.ignoreReadonly && e.prop("readonly") || o ? j : (void 0 !== e.val() && 0 !== e.val().trim().length ? $(fa(e.val().trim())) : d.useCurrent && m && (e.is("input") && 0 === e.val().trim().length || d.inline) && (c = b(), "string" == typeof d.useCurrent && (c = f[d.useCurrent](c)), $(c)), o = E(), K(), Q(), o.find(".timepicker-hours").hide(), o.find(".timepicker-minutes").hide(), o.find(".timepicker-seconds").hide(), Z(), J(), a(window).on("resize", G), o.on("click", "[data-action]", ca), o.on("mousedown", !1), n && n.hasClass("btn") && n.toggleClass("active"), o.show(), G(), d.focusOnShow && !e.is(":focus") && e.focus(), H({ type: "dp.show" }), j);
    },
        ea = function () {
      return o ? _() : da();
    },
        fa = function (a) {
      return a = b.isMoment(a) || a instanceof Date ? b(a) : b(a, h, d.useStrict), a.locale(d.locale), a;
    },
        ga = function (a) {
      var b,
          c,
          e,
          f,
          g = null,
          h = [],
          i = {},
          k = a.which,
          l = "p";w[k] = l;for (b in w) w.hasOwnProperty(b) && w[b] === l && (h.push(b), parseInt(b, 10) !== k && (i[b] = !0));for (b in d.keyBinds) if (d.keyBinds.hasOwnProperty(b) && "function" == typeof d.keyBinds[b] && (e = b.split(" "), e.length === h.length && v[k] === e[e.length - 1])) {
        for (f = !0, c = e.length - 2; c >= 0; c--) if (!(v[e[c]] in i)) {
          f = !1;break;
        }if (f) {
          g = d.keyBinds[b];break;
        }
      }g && (g.call(j, o), a.stopPropagation(), a.preventDefault());
    },
        ha = function (a) {
      w[a.which] = "r", a.stopPropagation(), a.preventDefault();
    },
        ia = function (b) {
      var c = a(b.target).val().trim(),
          d = c ? fa(c) : null;return $(d), b.stopImmediatePropagation(), !1;
    },
        ja = function () {
      e.on({ change: ia, blur: d.debug ? "" : _, keydown: ga, keyup: ha, focus: d.allowInputToggle ? da : "" }), c.is("input") ? e.on({ focus: da }) : n && (n.on("click", ea), n.on("mousedown", !1));
    },
        ka = function () {
      e.off({ change: ia, blur: _, keydown: ga, keyup: ha, focus: d.allowInputToggle ? _ : "" }), c.is("input") ? e.off({ focus: da }) : n && (n.off("click", ea), n.off("mousedown", !1));
    },
        la = function (b) {
      var c = {};return a.each(b, function () {
        var a = fa(this);a.isValid() && (c[a.format("YYYY-MM-DD")] = !0);
      }), Object.keys(c).length ? c : !1;
    },
        ma = function (b) {
      var c = {};return a.each(b, function () {
        c[this] = !0;
      }), Object.keys(c).length ? c : !1;
    },
        na = function () {
      var a = d.format || "L LT";g = a.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (a) {
        var b = k.localeData().longDateFormat(a) || a;return b.replace(/(\[[^\[]*\])|(\\)?(LTS|LT|LL?L?L?|l{1,4})/g, function (a) {
          return k.localeData().longDateFormat(a) || a;
        });
      }), h = d.extraFormats ? d.extraFormats.slice() : [], h.indexOf(a) < 0 && h.indexOf(g) < 0 && h.push(g), f = g.toLowerCase().indexOf("a") < 1 && g.replace(/\[.*?\]/g, "").indexOf("h") < 1, x("y") && (p = 2), x("M") && (p = 1), x("d") && (p = 0), i = Math.max(p, i), m || $(k);
    };if (j.destroy = function () {
      _(), ka(), c.removeData("DateTimePicker"), c.removeData("date");
    }, j.toggle = ea, j.show = da, j.hide = _, j.disable = function () {
      return _(), n && n.hasClass("btn") && n.addClass("disabled"), e.prop("disabled", !0), j;
    }, j.enable = function () {
      return n && n.hasClass("btn") && n.removeClass("disabled"), e.prop("disabled", !1), j;
    }, j.ignoreReadonly = function (a) {
      if (0 === arguments.length) return d.ignoreReadonly;if ("boolean" != typeof a) throw new TypeError("ignoreReadonly () expects a boolean parameter");return d.ignoreReadonly = a, j;
    }, j.options = function (b) {
      if (0 === arguments.length) return a.extend(!0, {}, d);if (!(b instanceof Object)) throw new TypeError("options() options parameter should be an object");return a.extend(!0, d, b), a.each(d, function (a, b) {
        if (void 0 === j[a]) throw new TypeError("option " + a + " is not recognized!");j[a](b);
      }), j;
    }, j.date = function (a) {
      if (0 === arguments.length) return m ? null : k.clone();if (!(null === a || "string" == typeof a || b.isMoment(a) || a instanceof Date)) throw new TypeError("date() parameter must be one of [null, string, moment or Date]");return $(null === a ? null : fa(a)), j;
    }, j.format = function (a) {
      if (0 === arguments.length) return d.format;if ("string" != typeof a && ("boolean" != typeof a || a !== !1)) throw new TypeError("format() expects a sting or boolean:false parameter " + a);return d.format = a, g && na(), j;
    }, j.dayViewHeaderFormat = function (a) {
      if (0 === arguments.length) return d.dayViewHeaderFormat;if ("string" != typeof a) throw new TypeError("dayViewHeaderFormat() expects a string parameter");return d.dayViewHeaderFormat = a, j;
    }, j.extraFormats = function (a) {
      if (0 === arguments.length) return d.extraFormats;if (a !== !1 && !(a instanceof Array)) throw new TypeError("extraFormats() expects an array or false parameter");return d.extraFormats = a, h && na(), j;
    }, j.disabledDates = function (b) {
      if (0 === arguments.length) return d.disabledDates ? a.extend({}, d.disabledDates) : d.disabledDates;if (!b) return d.disabledDates = !1, Z(), j;if (!(b instanceof Array)) throw new TypeError("disabledDates() expects an array parameter");return d.disabledDates = la(b), d.enabledDates = !1, Z(), j;
    }, j.enabledDates = function (b) {
      if (0 === arguments.length) return d.enabledDates ? a.extend({}, d.enabledDates) : d.enabledDates;if (!b) return d.enabledDates = !1, Z(), j;if (!(b instanceof Array)) throw new TypeError("enabledDates() expects an array parameter");return d.enabledDates = la(b), d.disabledDates = !1, Z(), j;
    }, j.daysOfWeekDisabled = function (a) {
      if (0 === arguments.length) return d.daysOfWeekDisabled.splice(0);if ("boolean" == typeof a && !a) return d.daysOfWeekDisabled = !1, Z(), j;if (!(a instanceof Array)) throw new TypeError("daysOfWeekDisabled() expects an array parameter");if (d.daysOfWeekDisabled = a.reduce(function (a, b) {
        return b = parseInt(b, 10), b > 6 || 0 > b || isNaN(b) ? a : (-1 === a.indexOf(b) && a.push(b), a);
      }, []).sort(), d.useCurrent && !d.keepInvalid) {
        for (var b = 0; !P(k, "d");) {
          if (k.add(1, "d"), 7 === b) throw "Tried 7 times to find a valid date";b++;
        }$(k);
      }return Z(), j;
    }, j.maxDate = function (a) {
      if (0 === arguments.length) return d.maxDate ? d.maxDate.clone() : d.maxDate;if ("boolean" == typeof a && a === !1) return d.maxDate = !1, Z(), j;"string" == typeof a && ("now" === a || "moment" === a) && (a = b());var c = fa(a);if (!c.isValid()) throw new TypeError("maxDate() Could not parse date parameter: " + a);if (d.minDate && c.isBefore(d.minDate)) throw new TypeError("maxDate() date parameter is before options.minDate: " + c.format(g));return d.maxDate = c, d.useCurrent && !d.keepInvalid && k.isAfter(a) && $(d.maxDate), l.isAfter(c) && (l = c.clone()), Z(), j;
    }, j.minDate = function (a) {
      if (0 === arguments.length) return d.minDate ? d.minDate.clone() : d.minDate;if ("boolean" == typeof a && a === !1) return d.minDate = !1, Z(), j;"string" == typeof a && ("now" === a || "moment" === a) && (a = b());var c = fa(a);if (!c.isValid()) throw new TypeError("minDate() Could not parse date parameter: " + a);if (d.maxDate && c.isAfter(d.maxDate)) throw new TypeError("minDate() date parameter is after options.maxDate: " + c.format(g));return d.minDate = c, d.useCurrent && !d.keepInvalid && k.isBefore(a) && $(d.minDate), l.isBefore(c) && (l = c.clone()), Z(), j;
    }, j.defaultDate = function (a) {
      if (0 === arguments.length) return d.defaultDate ? d.defaultDate.clone() : d.defaultDate;if (!a) return d.defaultDate = !1, j;"string" == typeof a && ("now" === a || "moment" === a) && (a = b());var c = fa(a);if (!c.isValid()) throw new TypeError("defaultDate() Could not parse date parameter: " + a);if (!P(c)) throw new TypeError("defaultDate() date passed is invalid according to component setup validations");return d.defaultDate = c, (d.defaultDate && d.inline || "" === e.val().trim() && void 0 === e.attr("placeholder")) && $(d.defaultDate), j;
    }, j.locale = function (a) {
      if (0 === arguments.length) return d.locale;if (!b.localeData(a)) throw new TypeError("locale() locale " + a + " is not loaded from moment locales!");return d.locale = a, k.locale(d.locale), l.locale(d.locale), g && na(), o && (_(), da()), j;
    }, j.stepping = function (a) {
      return 0 === arguments.length ? d.stepping : (a = parseInt(a, 10), (isNaN(a) || 1 > a) && (a = 1), d.stepping = a, j);
    }, j.useCurrent = function (a) {
      var b = ["year", "month", "day", "hour", "minute"];if (0 === arguments.length) return d.useCurrent;if ("boolean" != typeof a && "string" != typeof a) throw new TypeError("useCurrent() expects a boolean or string parameter");if ("string" == typeof a && -1 === b.indexOf(a.toLowerCase())) throw new TypeError("useCurrent() expects a string parameter of " + b.join(", "));return d.useCurrent = a, j;
    }, j.collapse = function (a) {
      if (0 === arguments.length) return d.collapse;if ("boolean" != typeof a) throw new TypeError("collapse() expects a boolean parameter");return d.collapse === a ? j : (d.collapse = a, o && (_(), da()), j);
    }, j.icons = function (b) {
      if (0 === arguments.length) return a.extend({}, d.icons);if (!(b instanceof Object)) throw new TypeError("icons() expects parameter to be an Object");return a.extend(d.icons, b), o && (_(), da()), j;
    }, j.useStrict = function (a) {
      if (0 === arguments.length) return d.useStrict;if ("boolean" != typeof a) throw new TypeError("useStrict() expects a boolean parameter");return d.useStrict = a, j;
    }, j.sideBySide = function (a) {
      if (0 === arguments.length) return d.sideBySide;if ("boolean" != typeof a) throw new TypeError("sideBySide() expects a boolean parameter");return d.sideBySide = a, o && (_(), da()), j;
    }, j.viewMode = function (a) {
      if (0 === arguments.length) return d.viewMode;if ("string" != typeof a) throw new TypeError("viewMode() expects a string parameter");if (-1 === r.indexOf(a)) throw new TypeError("viewMode() parameter must be one of (" + r.join(", ") + ") value");return d.viewMode = a, i = Math.max(r.indexOf(a), p), J(), j;
    }, j.toolbarPlacement = function (a) {
      if (0 === arguments.length) return d.toolbarPlacement;if ("string" != typeof a) throw new TypeError("toolbarPlacement() expects a string parameter");if (-1 === u.indexOf(a)) throw new TypeError("toolbarPlacement() parameter must be one of (" + u.join(", ") + ") value");return d.toolbarPlacement = a, o && (_(), da()), j;
    }, j.widgetPositioning = function (b) {
      if (0 === arguments.length) return a.extend({}, d.widgetPositioning);if ("[object Object]" !== {}.toString.call(b)) throw new TypeError("widgetPositioning() expects an object variable");if (b.horizontal) {
        if ("string" != typeof b.horizontal) throw new TypeError("widgetPositioning() horizontal variable must be a string");if (b.horizontal = b.horizontal.toLowerCase(), -1 === t.indexOf(b.horizontal)) throw new TypeError("widgetPositioning() expects horizontal parameter to be one of (" + t.join(", ") + ")");d.widgetPositioning.horizontal = b.horizontal;
      }if (b.vertical) {
        if ("string" != typeof b.vertical) throw new TypeError("widgetPositioning() vertical variable must be a string");if (b.vertical = b.vertical.toLowerCase(), -1 === s.indexOf(b.vertical)) throw new TypeError("widgetPositioning() expects vertical parameter to be one of (" + s.join(", ") + ")");d.widgetPositioning.vertical = b.vertical;
      }return Z(), j;
    }, j.calendarWeeks = function (a) {
      if (0 === arguments.length) return d.calendarWeeks;if ("boolean" != typeof a) throw new TypeError("calendarWeeks() expects parameter to be a boolean value");return d.calendarWeeks = a, Z(), j;
    }, j.showTodayButton = function (a) {
      if (0 === arguments.length) return d.showTodayButton;if ("boolean" != typeof a) throw new TypeError("showTodayButton() expects a boolean parameter");return d.showTodayButton = a, o && (_(), da()), j;
    }, j.showClear = function (a) {
      if (0 === arguments.length) return d.showClear;if ("boolean" != typeof a) throw new TypeError("showClear() expects a boolean parameter");return d.showClear = a, o && (_(), da()), j;
    }, j.widgetParent = function (b) {
      if (0 === arguments.length) return d.widgetParent;if ("string" == typeof b && (b = a(b)), null !== b && "string" != typeof b && !(b instanceof a)) throw new TypeError("widgetParent() expects a string or a jQuery object parameter");return d.widgetParent = b, o && (_(), da()), j;
    }, j.keepOpen = function (a) {
      if (0 === arguments.length) return d.keepOpen;if ("boolean" != typeof a) throw new TypeError("keepOpen() expects a boolean parameter");return d.keepOpen = a, j;
    }, j.focusOnShow = function (a) {
      if (0 === arguments.length) return d.focusOnShow;if ("boolean" != typeof a) throw new TypeError("focusOnShow() expects a boolean parameter");return d.focusOnShow = a, j;
    }, j.inline = function (a) {
      if (0 === arguments.length) return d.inline;if ("boolean" != typeof a) throw new TypeError("inline() expects a boolean parameter");return d.inline = a, j;
    }, j.clear = function () {
      return aa(), j;
    }, j.keyBinds = function (a) {
      return d.keyBinds = a, j;
    }, j.debug = function (a) {
      if ("boolean" != typeof a) throw new TypeError("debug() expects a boolean parameter");return d.debug = a, j;
    }, j.allowInputToggle = function (a) {
      if (0 === arguments.length) return d.allowInputToggle;if ("boolean" != typeof a) throw new TypeError("allowInputToggle() expects a boolean parameter");return d.allowInputToggle = a, j;
    }, j.showClose = function (a) {
      if (0 === arguments.length) return d.showClose;if ("boolean" != typeof a) throw new TypeError("showClose() expects a boolean parameter");return d.showClose = a, j;
    }, j.keepInvalid = function (a) {
      if (0 === arguments.length) return d.keepInvalid;if ("boolean" != typeof a) throw new TypeError("keepInvalid() expects a boolean parameter");return d.keepInvalid = a, j;
    }, j.datepickerInput = function (a) {
      if (0 === arguments.length) return d.datepickerInput;if ("string" != typeof a) throw new TypeError("datepickerInput() expects a string parameter");return d.datepickerInput = a, j;
    }, j.disabledTimeIntervals = function (b) {
      if (0 === arguments.length) return d.disabledTimeIntervals ? a.extend({}, d.disabledTimeIntervals) : d.disabledTimeIntervals;if (!b) return d.disabledTimeIntervals = !1, Z(), j;if (!(b instanceof Array)) throw new TypeError("disabledTimeIntervals() expects an array parameter");return d.disabledTimeIntervals = b, Z(), j;
    }, j.disabledHours = function (b) {
      if (0 === arguments.length) return d.disabledHours ? a.extend({}, d.disabledHours) : d.disabledHours;if (!b) return d.disabledHours = !1, Z(), j;if (!(b instanceof Array)) throw new TypeError("disabledHours() expects an array parameter");if (d.disabledHours = ma(b), d.enabledHours = !1, d.useCurrent && !d.keepInvalid) {
        for (var c = 0; !P(k, "h");) {
          if (k.add(1, "h"), 24 === c) throw "Tried 24 times to find a valid date";c++;
        }$(k);
      }return Z(), j;
    }, j.enabledHours = function (b) {
      if (0 === arguments.length) return d.enabledHours ? a.extend({}, d.enabledHours) : d.enabledHours;if (!b) return d.enabledHours = !1, Z(), j;if (!(b instanceof Array)) throw new TypeError("enabledHours() expects an array parameter");if (d.enabledHours = ma(b), d.disabledHours = !1, d.useCurrent && !d.keepInvalid) {
        for (var c = 0; !P(k, "h");) {
          if (k.add(1, "h"), 24 === c) throw "Tried 24 times to find a valid date";c++;
        }$(k);
      }return Z(), j;
    }, j.viewDate = function (a) {
      if (0 === arguments.length) return l.clone();if (!a) return l = k.clone(), j;if (!("string" == typeof a || b.isMoment(a) || a instanceof Date)) throw new TypeError("viewDate() parameter must be one of [string, moment or Date]");return l = fa(a), I(), j;
    }, c.is("input")) e = c;else if (e = c.find(d.datepickerInput), 0 === e.size()) e = c.find("input");else if (!e.is("input")) throw new Error('CSS class "' + d.datepickerInput + '" cannot be applied to non input element');if (c.hasClass("input-group") && (n = 0 === c.find(".datepickerbutton").size() ? c.find('[class^="input-group-"]') : c.find(".datepickerbutton")), !d.inline && !e.is("input")) throw new Error("Could not initialize DateTimePicker without an input element");return a.extend(!0, d, F()), j.options(d), na(), ja(), e.prop("disabled") && j.disable(), e.is("input") && 0 !== e.val().trim().length ? $(fa(e.val().trim())) : d.defaultDate && void 0 === e.attr("placeholder") && $(d.defaultDate), d.inline && da(), j;
  };a.fn.datetimepicker = function (b) {
    return this.each(function () {
      var d = a(this);d.data("DateTimePicker") || (b = a.extend(!0, {}, a.fn.datetimepicker.defaults, b), d.data("DateTimePicker", c(d, b)));
    });
  }, a.fn.datetimepicker.defaults = { format: !1, dayViewHeaderFormat: "MMMM YYYY", extraFormats: !1, stepping: 1, minDate: !1, maxDate: !1, useCurrent: !0, collapse: !0, locale: b.locale(), defaultDate: !1, disabledDates: !1, enabledDates: !1, icons: { time: "glyphicon glyphicon-time", date: "glyphicon glyphicon-calendar", up: "glyphicon glyphicon-chevron-up", down: "glyphicon glyphicon-chevron-down", previous: "glyphicon glyphicon-chevron-left", next: "glyphicon glyphicon-chevron-right", today: "glyphicon glyphicon-screenshot", clear: "glyphicon glyphicon-trash", close: "glyphicon glyphicon-remove" }, useStrict: !1, sideBySide: !1, daysOfWeekDisabled: !1, calendarWeeks: !1, viewMode: "days", toolbarPlacement: "default", showTodayButton: !1, showClear: !1, showClose: !1, widgetPositioning: { horizontal: "auto", vertical: "auto" }, widgetParent: null, ignoreReadonly: !1, keepOpen: !1, focusOnShow: !0, inline: !1, keepInvalid: !1, datepickerInput: ".datepickerinput", keyBinds: { up: function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") ? this.date(c.clone().subtract(7, "d")) : this.date(c.clone().add(1, "m"));
        }
      }, down: function (a) {
        if (!a) return void this.show();var c = this.date() || b();a.find(".datepicker").is(":visible") ? this.date(c.clone().add(7, "d")) : this.date(c.clone().subtract(1, "m"));
      }, "control up": function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") ? this.date(c.clone().subtract(1, "y")) : this.date(c.clone().add(1, "h"));
        }
      }, "control down": function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") ? this.date(c.clone().add(1, "y")) : this.date(c.clone().subtract(1, "h"));
        }
      }, left: function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") && this.date(c.clone().subtract(1, "d"));
        }
      }, right: function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") && this.date(c.clone().add(1, "d"));
        }
      }, pageUp: function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") && this.date(c.clone().subtract(1, "M"));
        }
      }, pageDown: function (a) {
        if (a) {
          var c = this.date() || b();a.find(".datepicker").is(":visible") && this.date(c.clone().add(1, "M"));
        }
      }, enter: function () {
        this.hide();
      }, escape: function () {
        this.hide();
      }, "control space": function (a) {
        a.find(".timepicker").is(":visible") && a.find('.btn[data-action="togglePeriod"]').click();
      }, t: function () {
        this.date(b());
      }, "delete": function () {
        this.clear();
      } }, debug: !1, allowInputToggle: !1, disabledTimeIntervals: !1, disabledHours: !1, enabledHours: !1, viewDate: !1 };
});

//# sourceMappingURL=bootstrap-datetimepicker.min-compiled.js.map