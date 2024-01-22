(() => {
  "use strict";
  const e = [];
  class t {
    constructor(e, t, n, d) {
      (this.name = e),
        (this.id = t),
        (this.description = n),
        (this.icon = d),
        (this.tasks = []);
    }
    addTask(e) {
      this.tasks.push(e);
    }
  }
  class n {
    constructor(t, n, d, o) {
      (this.id = `${t}-task-${(function (t) {
        for (let n of e) if (n.id === t) return n.tasks.length + 1;
      })(t)}`),
        (this.description = n),
        (this.priority = d),
        (this.date = o);
    }
  }
  function d() {
    let t,
      n,
      d = document.querySelectorAll(".default-field"),
      o = document.querySelectorAll(".added-field"),
      a = Array.prototype.concat.call(...d, ...o);
    for (let e of a)
      e.getAttribute("class").includes("active") && (t = e.getAttribute("id"));
    for (let d of e) d.id === t && (n = e.indexOf(d));
    return n;
  }
  function o(e) {
    if ("inbox" === e || "today" === e || "week" === e || "logbook" === e)
      return !0;
  }
  function a(t) {
    let n = document.createElement("div"),
      a = document.createElement("span"),
      i = document.createElement("div"),
      r = document.createElement("button"),
      c = document.createElement("button"),
      s = document.createElement("button"),
      u = document.createElement("button");
    n.classList.add("task"),
      n.setAttribute("id", t.id),
      a.classList.add("task-text-content"),
      i.classList.add("task-options-container"),
      r.classList.add("edit-task"),
      c.classList.add("done-task"),
      s.classList.add("priority-preview"),
      u.classList.add("task-date"),
      (a.textContent = t.description),
      (r.textContent = "Edit"),
      (c.textContent = "Done"),
      (s.textContent = `${t.priority
        .slice(0, 1)
        .toUpperCase()}${t.priority.slice(1)}`),
      (u.textContent = t.date),
      (function (e, t) {
        "low" === t
          ? e.classList.add("low-priority")
          : "medium" === t
          ? e.classList.add("medium-priority")
          : "high" === t && e.classList.add("high-priority");
      })(n, t.priority),
      r.addEventListener("click", () => {
        !(function (t) {
          const n = document.createElement("div"),
            a = document.createElement("div"),
            i = document.createElement("textarea"),
            r = document.createElement("p"),
            c = document.createElement("p"),
            s = document.createElement("p"),
            u = document.createElement("input"),
            p = document.createElement("select"),
            m = document.createElement("option"),
            h = document.createElement("option"),
            C = document.createElement("option"),
            f = document.createElement("button"),
            y = document.createElement("button"),
            b = document.createElement("button");
          let v,
            E = document.querySelector(`#${t}`);
          n.setAttribute("id", "add-task-modal"),
            a.setAttribute("id", "modal-controls"),
            i.setAttribute("id", "add-task-description"),
            u.setAttribute("type", "date"),
            u.setAttribute("id", "task-date"),
            r.setAttribute("class", "add-task-para"),
            c.setAttribute("class", "add-task-para"),
            s.setAttribute("class", "add-task-para"),
            p.setAttribute("id", "priority-selector"),
            (m.value = "low"),
            (h.value = "medium"),
            (C.value = "high"),
            f.setAttribute("id", "cancel-modal"),
            y.setAttribute("id", "submit-modal"),
            b.setAttribute("id", "delete-modal"),
            (r.textContent = "Enter task description"),
            (c.textContent = "Enter date"),
            (s.textContent = "Select priority"),
            (m.textContent = "Low"),
            (h.textContent = "Medium"),
            (C.textContent = "High"),
            (f.textContent = "Cancel"),
            (y.textContent = "Submit"),
            (b.textContent = "Delete"),
            (i.textContent = E.querySelector(".task-text-content").textContent),
            (u.value = E.querySelector(".task-date").textContent),
            "Low" === E.querySelector(".priority-preview").textContent
              ? m.setAttribute("selected", "selected")
              : "Medium" === E.querySelector(".priority-preview").textContent
              ? h.setAttribute("selected", "selected")
              : "High" === E.querySelector(".priority-preview").textContent &&
                C.setAttribute("selected", "selected");
          for (let n of e[d()].tasks)
            n.id === t && (v = e[d()].tasks.indexOf(n));
          n.appendChild(r),
            n.appendChild(i),
            n.appendChild(c),
            n.appendChild(u),
            n.appendChild(s),
            n.appendChild(p),
            n.appendChild(a),
            p.appendChild(m),
            p.appendChild(h),
            p.appendChild(C),
            n.appendChild(b),
            a.appendChild(f),
            a.appendChild(y),
            n.addEventListener("click", (a) => {
              let r = a.target.id;
              if ("cancel-modal" === r)
                document.querySelector("#main-content").removeChild(n);
              else if ("submit-modal" === r) {
                if ("" === u.value || "" === i.value)
                  return void alert("All fields need to be filled");
                (e[d()].tasks[v].description = i.value),
                  (e[d()].tasks[v].priority = p.value),
                  (e[d()].tasks[v].date = u.value),
                  l(),
                  document.querySelector("#main-content").removeChild(n);
              } else
                "delete-modal" === r &&
                  ((function (t) {
                    for (let n of e)
                      o(n.id) ||
                        (n.tasks.forEach((e) => {
                          if (t === e.id) {
                            let t = n.tasks.indexOf(e);
                            n.tasks.splice(t, 1);
                          }
                        }),
                        console.log(n.tasks));
                  })(t),
                  l(),
                  document.querySelector("#main-content").removeChild(n));
            }),
            document.querySelector("#main-content").appendChild(n);
        })(t.id);
      }),
      c.addEventListener("click", () => {
        !(function (t) {
          for (let n of e)
            o(n.id) ||
              n.tasks.forEach((d) => {
                if (t === d.id) {
                  let t = n.tasks.indexOf(d);
                  e[3].addTask(d), n.tasks.splice(t, 1);
                }
              });
          l();
        })(t.id);
      }),
      document.querySelector(".task-wrapper").appendChild(n),
      n.appendChild(a),
      n.appendChild(i),
      i.appendChild(r),
      i.appendChild(c),
      i.appendChild(s),
      i.appendChild(u);
  }
  function l() {
    !(function () {
      let e = document.querySelector(".task-wrapper"),
        t = e.lastElementChild;
      for (; t; ) e.removeChild(t), (t = e.lastElementChild);
    })();
    let t = document.querySelectorAll(".default-field"),
      n = document.querySelectorAll(".added-field"),
      l = (Array.prototype.concat.call(...t, ...n), e[d()].id),
      i = document.querySelector(".main-content-title-before"),
      r = document.querySelector(".main-content-title"),
      c = document.querySelector(".main-content-description");
    document.querySelector(".task-wrapper"),
      (function () {
        e[0].tasks = [];
        for (let t of e)
          o(t.id) ||
            t.tasks.forEach((t) => {
              e[0].addTask(t);
            });
        e[1].tasks = [];
        for (let t of e)
          o(t.id) ||
            t.tasks.forEach((t) => {
              let n = new Date(),
                d = `${n.getFullYear()}-${n.getMonth()}-${n.getDate()}`,
                o = new Date(t.date);
              d === `${o.getFullYear()}-${o.getMonth()}-${o.getDate()}` &&
                e[1].addTask(t);
            });
        e[2].tasks = [];
        for (let t of e)
          o(t.id) ||
            t.tasks.forEach((t) => {
              let n = new Date(),
                d = new Date(n);
              d.setDate(d.getDate() - d.getDay());
              let o = new Date(n);
              o.setDate(o.getDate() + (6 - o.getDay()));
              let a = new Date(t.date),
                l = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
                i = `${o.getFullYear()}-${o.getMonth()}-${o.getDate()}`,
                r = `${a.getFullYear()}-${a.getMonth()}-${a.getDate()}`;
              r >= l && r <= i && e[2].addTask(t);
            });
      })(),
      localStorage.setItem("projects", JSON.stringify(e));
    for (let t of e)
      if (t.id === l) {
        (i.textContent = t.icon),
          (r.textContent = t.name),
          (c.textContent = t.description);
        for (let e of t.tasks) a(e);
      }
  }
  function i(e) {
    let t = [];
    document
      .querySelectorAll(".default-field")
      .forEach((e) => t.push(e.getAttribute("id")));
    let n = [];
    document
      .querySelectorAll(".added-field")
      .forEach((e) => n.push(e.getAttribute("id"))),
      (t.includes(e) || n.includes(e)) &&
        ((function (e) {
          let t = document.querySelectorAll(".default-field"),
            n = document.querySelectorAll(".added-field");
          Array.prototype.concat.call(...t, ...n).forEach((e) => {
            e.classList.remove("active");
          }),
            document.querySelector(`#${e}`).classList.add("active");
        })(e),
        l());
  }
  function r(e, t, n) {
    const d = document.createElement("div"),
      o = document.createElement("span"),
      a = document.createElement("span");
    d.setAttribute("id", e),
      d.classList.add("added-field"),
      (o.textContent = n),
      o.classList.add("iconHolderSpan"),
      (a.textContent = t),
      a.classList.add("textHolderSpan"),
      document.querySelector(".added-fields").appendChild(d),
      d.appendChild(o),
      d.appendChild(a);
  }
  function c(e) {
    "close" === e
      ? ((document.querySelector("#add-project-name").value = ""),
        (document.querySelector("#add-project-description").value = ""),
        document
          .querySelector("#add-project-modal")
          .classList.add("closed-modal"))
      : (e = "open") &&
        document
          .querySelector("#add-project-modal")
          .classList.remove("closed-modal");
  }
  if (
    (e.push(
      new t("Inbox", "inbox", "All created tasks will appear here.", "📥")
    ),
    e.push(
      new t(
        "Today",
        "today",
        "All tasks with expiration date of today will appear here",
        "⭐"
      )
    ),
    e.push(
      new t(
        "This week",
        "week",
        "All tasks with expiration date of this week will appear here",
        "📅"
      )
    ),
    e.push(
      new t(
        "Logbook",
        "logbook",
        "All tasks that are completed will appear here",
        "📒"
      )
    ),
    e.push(
      new t(
        "Example project",
        "example-project",
        "Example as default project and place to place tasks that will appear in other categories",
        "[icon]"
      )
    ),
    e[4].addTask(
      new n(
        e[4].id,
        "Random task serving as example and space filler",
        "low",
        "2024-01-21"
      )
    ),
    localStorage.getItem("projects"))
  ) {
    console.log(e);
    for (let t = e.length - 1; t >= 0; t--) e.pop();
    e.push(...JSON.parse(localStorage.getItem("projects")));
    for (let d of e)
      if ((Object.setPrototypeOf(d, t.prototype), !o(d)))
        for (let e of d.tasks) Object.setPrototypeOf(e, n);
    for (let t = 4; t < e.length; t++) r(e[t].id, e[t].name, e[t].icon);
    i("inbox");
  } else {
    console.log("Failed loading local storage projects"),
      localStorage.setItem("projects", JSON.stringify(e));
    for (let t = 4; t < e.length; t++) r(e[t].id, e[t].name, e[t].icon);
    i("inbox");
  }
  document.querySelector(".button1").addEventListener("click", () => {
    !(function () {
      const e = document.createElement("div"),
        t = document.createElement("div"),
        n = document.createElement("p"),
        d = document.createElement("button"),
        o = document.createElement("button");
      e.setAttribute("id", "delete-local-storage-modal"),
        n.setAttribute("class", "delete-local-storage-para"),
        d.setAttribute("id", "yes-modal"),
        o.setAttribute("id", "no-modal"),
        (n.textContent = "Are you sure you want to delete all saved "),
        (d.textContent = "Yes"),
        (o.textContent = "No"),
        e.appendChild(n),
        e.appendChild(t),
        t.appendChild(d),
        t.appendChild(o),
        document.querySelector("#main-content").appendChild(e),
        t.addEventListener("click", (t) => {
          let n = t.target.id;
          "no-modal" === n
            ? document.querySelector("#main-content").removeChild(e)
            : "yes-modal" === n &&
              (localStorage.removeItem("projects"),
              document.querySelector("#main-content").removeChild(e));
        });
    })();
  }),
    document.querySelector("#middlesidebar").addEventListener("click", (e) => {
      i(e.target.id);
    }),
    document.querySelector("#add-project").addEventListener("click", () => {
      document
        .querySelector("#add-project-modal")
        .getAttribute("class")
        .includes("closed-modal")
        ? c("open")
        : c("close");
    }),
    document
      .querySelector("#add-project-modal")
      .addEventListener("click", (n) => {
        let d = n.target.id;
        "submit" === d
          ? (function () {
              const n = document.querySelector("#add-project-name").value,
                d = document.querySelector("#add-project-description").value;
              let o = (function (e) {
                return e.includes(" ")
                  ? e.replaceAll(" ", "-").toLowerCase()
                  : e.toLowerCase();
              })(n);
              if (
                (function (t) {
                  for (let n of e) if (n.id === t) return !0;
                })(o)
              )
                return (
                  alert("You can't use the same name as old pojects"),
                  void (document.querySelector("#add-project-name").value = "")
                );
              "" !== n
                ? "" !== d
                  ? (r(o, n, "[icon]"),
                    e.push(new t(n, o, d, "[icon]")),
                    c("close"))
                  : alert("You need to enter project description")
                : alert("You need to enter project name");
            })()
          : "cancel" === d && c("close");
      }),
    document.querySelector("#footer").addEventListener("click", (t) => {
      let r = t.target.id;
      "add-task" === r
        ? (function () {
            if (o(e[d()].id))
              return void alert("You can only add tasks in added projects");
            const t = document.createElement("div"),
              i = document.createElement("div"),
              r = document.createElement("textarea"),
              c = document.createElement("p"),
              s = document.createElement("p"),
              u = document.createElement("p"),
              p = document.createElement("input"),
              m = document.createElement("select"),
              h = document.createElement("option"),
              C = document.createElement("option"),
              f = document.createElement("option"),
              y = document.createElement("button"),
              b = document.createElement("button");
            t.setAttribute("id", "add-task-modal"),
              i.setAttribute("id", "modal-controls"),
              r.setAttribute("id", "add-task-description"),
              p.setAttribute("type", "date"),
              p.setAttribute("id", "task-date"),
              c.setAttribute("class", "add-task-para"),
              s.setAttribute("class", "add-task-para"),
              u.setAttribute("class", "add-task-para"),
              m.setAttribute("id", "priority-selector"),
              (h.value = "low"),
              (C.value = "medium"),
              (f.value = "high"),
              y.setAttribute("id", "cancel-modal"),
              b.setAttribute("id", "submit-modal"),
              (c.textContent = "Enter task description"),
              (s.textContent = "Enter date"),
              (u.textContent = "Select priority"),
              (h.textContent = "Low"),
              (C.textContent = "Medium"),
              (f.textContent = "High"),
              (y.textContent = "Cancel"),
              (b.textContent = "Submit"),
              t.appendChild(c),
              t.appendChild(r),
              t.appendChild(s),
              t.appendChild(p),
              t.appendChild(u),
              t.appendChild(m),
              t.appendChild(i),
              m.appendChild(h),
              m.appendChild(C),
              m.appendChild(f),
              i.appendChild(y),
              i.appendChild(b),
              i.addEventListener("click", (o) => {
                let i = o.target.id;
                if ("cancel-modal" === i)
                  document.querySelector("#main-content").removeChild(t);
                else if ("submit-modal" === i) {
                  if ("" === p.value || "" === r.value)
                    return void alert("All fields need to be filled");
                  e[d()].addTask(new n(e[d()].id, r.value, m.value, p.value)),
                    a(e[d()].tasks[e[d()].tasks.length - 1], e[d()].id),
                    l(),
                    document.querySelector("#main-content").removeChild(t);
                }
              }),
              document.querySelector("#main-content").appendChild(t);
          })()
        : "edit-project" === r
        ? (function () {
            if (o(e[d()].id))
              return void alert("You can only edit added projects");
            const t = document.createElement("div"),
              n = document.createElement("div"),
              a = document.createElement("p"),
              i = document.createElement("p"),
              r = document.createElement("p"),
              c = document.createElement("input"),
              s = document.createElement("input"),
              u = document.createElement("textarea"),
              p = document.createElement("button"),
              m = document.createElement("button");
            t.setAttribute("id", "edit-project-modal"),
              n.setAttribute("id", "modal-controls"),
              u.setAttribute("id", "edit-project-description"),
              r.setAttribute("class", "edit-project-para"),
              a.setAttribute("class", "edit-project-para"),
              i.setAttribute("class", "edit-project-para"),
              c.setAttribute("id", "edit-project-name"),
              s.setAttribute("id", "edit-project-icon"),
              p.setAttribute("id", "cancel-modal"),
              m.setAttribute("id", "submit-modal"),
              (r.textContent = "Edit project description"),
              (a.textContent = "Change project name"),
              (i.textContent = "Change project icon"),
              (p.textContent = "Cancel"),
              (m.textContent = "Submit"),
              (c.value = e[d()].name),
              (s.value = e[d()].icon),
              (u.textContent = e[d()].description),
              t.appendChild(a),
              t.appendChild(c),
              t.appendChild(i),
              t.appendChild(s),
              t.appendChild(r),
              t.appendChild(u),
              t.appendChild(n),
              n.appendChild(p),
              n.appendChild(m),
              document.querySelector("#main-content").appendChild(t),
              n.addEventListener("click", (n) => {
                let o = n.target.id;
                if ("cancel-modal" === o)
                  document.querySelector("#main-content").removeChild(t);
                else if ("submit-modal" === o) {
                  if ("" === c.value || "" === s.value || "" === u)
                    return void alert("All fields need to be filled up");
                  (e[d()].name = c.value),
                    (e[d()].icon = s.value),
                    (e[d()].description = u.value),
                    (document.querySelector(
                      `div#${e[d()].id} > .iconHolderSpan`
                    ).textContent = s.value),
                    (document.querySelector(
                      `div#${e[d()].id} > .textHolderSpan`
                    ).textContent = c.value),
                    l(),
                    document.querySelector("#main-content").removeChild(t);
                }
              });
          })()
        : "delete-project" === r &&
          (function () {
            if (o(e[d()].id))
              return void alert("You can only delete added projects");
            const t = document.createElement("div"),
              n = document.createElement("div"),
              a = document.createElement("p"),
              r = document.createElement("button"),
              c = document.createElement("button");
            t.setAttribute("id", "delete-project-modal"),
              n.setAttribute("id", "delete-modal-controls"),
              a.setAttribute("class", "delete-project-para"),
              r.setAttribute("id", "cancel-modal"),
              c.setAttribute("id", "submit-modal"),
              (a.textContent = "Are you sure you want to delete this project?"),
              (r.textContent = "Cancel"),
              (c.textContent = "Submit"),
              t.appendChild(a),
              t.appendChild(n),
              n.appendChild(r),
              n.appendChild(c),
              document.querySelector("#main-content").appendChild(t),
              n.addEventListener("click", (n) => {
                let o = n.target.id;
                if ("cancel-modal" === o)
                  document.querySelector("#main-content").removeChild(t);
                else if ("submit-modal" === o) {
                  let n = d();
                  document.querySelector(`#${e[n].id}`).remove(),
                    i("inbox"),
                    e.splice(n, 1),
                    document.querySelector("#main-content").removeChild(t),
                    l();
                }
              });
          })();
    });
})();
