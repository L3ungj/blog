---
title: "Chaos Theory and the Lorenz Attractor"
date: "2025-09-14"
tags: [Mathematics, Physics, Philosphy]
---

# Butterfly Effect

> "Does the flap of a butterfly's wings in Brazil set off a tornado in Texas?"
>
> — Edward Lorenz

The [Butterfly Effect](https://en.wikipedia.org/wiki/Butterfly_effect) states that a butterfly could potentially start a tornado by flapping its wings, even when they are separated by a large distance. How is this possible? 

Through common sense, we understand that things around us exhibit [locality](https://en.wikipedia.org/wiki/Principle_of_locality), meaning objects are influenced only by its immediate surroundings (both in the time scale and space scale). This is largely true, for example, not studying for a test will likely lead to you failing the test. However, an interesting question to ask here is, would it also lead to someone who lives in the opposite side of the globe, that you have never met, winning a cooking competition?

At first glance, your answer may be a confident "No". I mean, not to mention that studying and cooking are completely different things, if I don't even know the person, how can my actions even influence them, right? This is a very fair point, but there are a few flaws:

- The two subjects of studying and cooking do not need to be related for one to influence another
- [Six degrees of separation](https://en.wikipedia.org/wiki/Six_degrees_of_separation) tells us that we live in a [small world](https://en.wikipedia.org/wiki/Small-world_network), so we are closer to _any_ strangers than you think (six "handshakes" away)
- Even if you and the other person are completely isolated, through the propogation of air particles, or any other medium, there is still some way that you could influence them indirectly

So whether that is possible is still debatable. Just like all things in life, there is a branch of mathematics that studies this, under the name of "Chaos Theory".

# Chaos Theory

With a slightly daunting (or cool) name, Chaos Theory studies systems that are highly sensitive to initial conditions. When an object is said to exhibit chaotic behaviour, it means "the present determines the future but the approximate present does not approximately determine the future" (by Edward Lorenz). For most physical things in reality, there is no chaos. For instance, if you throw a basketball perfectly, you can perform a _swish_ (a score without touching the rim). If you throw the ball with $1\%$ more speed, or a $1^\circ$ angle difference, you may fail the swish and hit the rim, but the goal would most likely still be scored. In Lorenz's terms, the approximate present (speed, angle) determined the approximate future (a score), thus the basketball is not chaotic.

However, if we set our eyes on the atmosphere, we see disorder, havoc and chaos. Lorenz developed a mathematical model for atmospheric convection, with the use of three variables, $x$, $y$ and $z$, each describing something about the system. This makes the _Lorenz Atrractor_, which is shown in the following simulation (which is also present in the home page):

[LorenzAttractor]

The graph resembles the shape of a butterfly, which may have inspired the term _Butterfly effect_. The simulation used the three governing equations of $\dot x, \dot y, \dot z$, which is fully deterministic. However, a slight change in its initial position could have a big effect. For example, if the particle started $1\%$ higher, then after 10 seconds, the particle's position would be vastly different than the original particle's position. Therefore, the Lorenz particle exhibits chaotic behaviour.

# Implications in Real Life

Through the study of chaos theory, we know that certain systems are chaotic, such as the weather. Therefore, observatories can never predict the weather every day in the next month, since if they made even the slightest $0.0001\%$ error in their measurements, this error would grow exponentially into chaos, in approximately [14 days](https://press.uni-mainz.de/the-limits-of-weather-forecasting-how-far-into-the-future-can-we-look/). Even with better measurement systems, it is unlikely that this limit can be improved significantly, as we are dealing with the exponential growth of error.

[Laplace's Demon](https://en.wikipedia.org/wiki/Laplace%27s_demon) explores a concept that is completely different from Chaos Theory. It states if one knows all forces and positions of every single object in the universe, and has the ability to analyse these data, one would be able to predict all of future, of every existing object to its full. The intellect is so-called the _demon_. If there is such Demon, then there will be no Chaos Theory, as why care about sensitive intial conditions when you know the all details with infinite precision of every object. This also prompts us to ask, "If the demon knows the future fully, does this mean we have no free will?", but that's a question for another day.

I find it interesting to think about how my actions now will affect me or other people in a drastically different way in the future. In our daily lives, we are constantly making decisions, sometimes smaller decisions like what food to eat for dinner, other times bigger decisions like going to which university. Chaos Theory teaches us that sometimes small decisions can influence your life vastly as well! Knowing that every action we take can have large impacts, preharps a better way to live life is not to plan ahead too much, and instead just live in the present and enjoy ourselves to the fullest...