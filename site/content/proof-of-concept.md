---
title: "Proof of concept"
weight: 1
---
## StableUnit overview

Bitcoin cannot be used as everyday cash, a store of value, or international unit of account because of its volatility. 
StableUnit solves this problem with a completely decentralized and private stable cryptocurrency. 
It’s fully backed by crypto collateral while the system is small, and utilizes multiple layers of black-swan resistant mechanisms to maintain a stable price.

## Proof of concept

{{< youtube qx3rxGSVBDM >}}

Please help us with beta testing [join telegram group](https://t.me/stableunit)

## MultiLayer Stabilization
![png](/concept/multilayer_stabilization.png)

In normal market conditions the price is stable because traders will buy SU when the price is below $1, knowing they can sell those SU to the stabilisation reserve instantly at $1 for profit, which drives the price back up.
When there is unusual volatility, REPOs are available to buy with SU that can be redeemed for SU + interest when the reserve has been replenished – incentivising people to push the price back up during market shocks.
If there is too much supply pressure for REPOs to handle, then DAO tokens will be created and used to replenish the reserve at the cost of DAO token holders.
As a last resort, people will be incentivized via interest to lock up their funds.

## Agent-based simulation
[ Description of the methodology will be added soon.]

<div class="agent">
  <div class="agent__group-wrapper">
    <div class="agent__group agent__group_inputs">
      <p class="agent__group-label">Inputs</p>
      <div class="agent__group-item">Eth price</div>
      <div class="agent__group-item">Demand</div>
    </div>
    <img class="agent__group-arrow" src="/concept/flowchart_arrow.svg">
  </div>
  <div class="agent__group-wrapper">
    <div class="agent__group agent__group_users">
      <p class="agent__group-label">Users</p>
      <div class="agent__group-item">Retail Hodlers</div>
      <div class="agent__group-item">Retail Traders</div>
      <div class="agent__group-item">Arbitrage Bots</div>
      <div class="agent__group-item">Trading Bots</div>
      <div class="agent__group-item">Other Bots</div>
    </div>
    <img class="agent__group-arrow" src="/concept/flowchart_arrow.svg">
  </div>
  <div class="agent__group-wrapper">
    <div class="agent__group agent__group_stabilization">
      <p class="agent__group-label">Stabilization</p>
      <div class="agent__group-item">Market Action/Liquidity</div>
      <div class="agent__group-item">Reserve</div>
      <div class="agent__group-item">REPOs</div>
      <div class="agent__group-item">Shares Dilution</div>
      <div class="agent__group-item">Temporary Parking</div>
    </div>
    <img class="agent__group-arrow" src="/concept/flowchart_arrow.svg">
  </div>
  <div class="agent__group-wrapper agent__group-wrapper_link">
    <a href="https://simulation.stableunit.org">Simulation results</a>
  </div>
</div>

## Monte Carlo Simulation 

[Link to simulation](/simulation)

[Simulation results](/simulation#results)
