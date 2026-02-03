// Just started doing this today so lots of redundancy in the code...

const pills = Array.from(document.querySelectorAll(".three-half"));

const burst = new mojs.Burst({
  radius: { 0: Math.floor(Math.random() * 50) + 100 },
  left: "50%",
  top: "47%",
  rotate: { 0: 90 },
  opacity: { 1: 0 },
  children: {
    fill: { "#ffe9a3": "#ffe9a3" },
  },
  count: 20,
});

const timeline = gsap.timeline();
timeline
  .to(pills, {
    left: 0,
    duration: 1.5,
  })
  .to(
    "h2:nth-of-type(1)",
    {
      "--t": 0,
      duration: 1.5,
    },
    "0.2"
  )
  .to(pills, {
    y: "12.5vh",
    rotate: 180,
  })
  .to(pills, { left: "initial", right: 0, duration: 1.5 })
  .to(
    "h2:nth-of-type(2)",
    {
      "--t": 0,
      duration: 1.5,
    },
    "=-1.3"
  )
  .to(pills, {
    y: "31vh",
    rotate: 0,
  })
  .to(pills, { right: "calc(50% - 40px)" })
  .to(pills, { width: 32, x: -24, onComplete: () => burst.replay() })
  .to(pills, {
    y: "45vh",
    delay: 0.6,
  })
  .to(pills, {
    width: 500,
    height: 100,
    x: 200,
  })
  .from("h1 span", {
    y: 100,
    opacity: 0,
    stagger: 0.2,
    duration: 1,
    ease: "elastic.out(1.2, 0.4)",
  })

  .to(pills, {
    rotate: 15,
  })
  .to(
    "h1",
    {
      rotate: 15,
    },
    "=-0.5"
  )
  .to("h1 span:nth-of-type(4)", {
    x:0,
    opacity: 0,
  })
  .to(pills, {
    rotate: 0,
  })
  .to(
    "h1",
    {
      rotate: 0,
    },
    "=-0.5"
  )
  .to("h1", {
    color: "#ffe9a3",
  })

  .to(pills, {
    width: 34,
    height: 34,
    x: 66,
    y: "50vh",
  })
  .to(pills[0], {
    y: "48vh",
  })
  .to(
    pills[1],
    {
      y: "53vh",
      marginTop: -4,
    },
    "=-0.5"
  )
  .to(
    pills,
    {
      borderRadius: "0 50rem 50rem 0",
    },
    "=-0.5"
  )
  .to(pills, {
    "--o": 1,
  })
  .to(pills, {});