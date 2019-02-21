# Introduction 
React MVVM architecture powered by MobX. 

This example is a simple crypto-currency price feed application. It uses websocket price data as a source (provided by binance publicly)

### Objective:
* MobX is powerful but too free to use. A team should have a standard & flexible architecture/patterns 
that works/scales from small to large use cases and yet simple to learn.
* Encourage others to learn **reactive data stream** concept. (Highly recommended ReactiveX, i.e. RxJs, RxJava, RxSwift) 
* Utilizing functional programming to **compose & transform reactive data stream** to desired output or behaviour.

### The Heart of MVVM
* A ViewModel(VM) should have **NO** dependency of React and should have no idea what the view looks like.
* A correct implementation of MVVM architecture should achieve 100% decoupled business logic / data flow from views.
* A pure VM is much easier to test than a "React components with state logic".
* VMs should be light & cheap and be easily re-implemented with the same interface that consumed by the view.
* If you are using typescript, you can **SAFELY** compose the VM with a lot of programming skills(Mixins/Traits/Inheritance) heavily used in 
other language to reduce boilerplate drastically. Typescript compiler can really protect your code base. *(Probably this will become the 
strongest reason to choose typescript over plain javascript)*

# Run/Edit in CodeSandbox

| Language | CodeSandbox |
| --- | --- |
| Javascript | [![Edit mobx-react-price-feed-mvvm-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gaplo917/mobx-react-mvvm-example/tree/master/) |
| Typescript | [![Edit mobx-react-price-feed-mvvm-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/gaplo917/mobx-react-mvvm-example/tree/typescript/) |

# Run in local
```
yarn install
yarn start
```
