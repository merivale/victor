# Victor / src / Theory

The overarching hypothesis behind my model is that every atomic English message is made up out of a series of zero or more *elaborations* applied to a core *nucleus*. (The model does not currently cover compound messages, but will in due course be expanded in this direction; the working assumption is that these too can be treated as the result of further elaborations, but elaborations that introduce a second nucleus into the message.) Consequently my theory as a whole consists of two interlocking theories: a theory of plain English messages (i.e. those messages composed of an unelaborated nucleus), and a theory of English elaborations.

For exposition purposes, the model is divided into four layers of increasing complexity. The first layer handles only plain, unelaborated messages, while subsequent layers add elaborations. The intention is that readers new to the theory should familiarise themselves with plain messages before moving on to the elaborations; and with simpler elaborations before moving on to the more complex ones. Each layer is housed in its own directory (though the more complex layers import code from the simpler layers as well). Each of these directories contains its own README file explaining the code and the theory for that layer of the model. These should be read in order:

1. Plain Messages (the `Plain` directory)
    - [view README and source](https://github.com/merivale/victor/tree/master/src/Theory/Plain)
    - [experiment with the model](https://merivale.github.io/victor/plain.html)
2. Short Elaborations (the `Short` directory)
    - [view README and source](https://github.com/merivale/victor/tree/master/src/Theory/Short)
    - [experiment with the model](https://merivale.github.io/victor/short.html)
3. Long Elaborations (the `Long` directory)
    - [view README and source](https://github.com/merivale/victor/tree/master/src/Theory/Long)
    - [experiment with the model](https://merivale.github.io/victor/long.html)
4. Object Elaborations (the `Object` directory)
    - [view README and source](https://github.com/merivale/victor/tree/master/src/Theory/Object)
    - [experiment with the model](https://merivale.github.io/victor/object.html)

In addition, the `Words` directory contains a handful of (theoretically not very interesting) modules for converting ideas into words. These modules are shared between the different layers.
