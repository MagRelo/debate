# Development
### To Do
- [ ] User Login & Auth
- [ ] Solidity Contracts
- [ ] Web3 Integration
- [ ] Search & Filter

### Install
`$ npm install`
### Run
- Start backend server at http://localhost:8080 `$ npm run dev`
- Start frontend server at http://localhost:3000 `$ npm start`
### Build
`$ npm run build`
### Deploy
- Push to github (master branch) and kick off deploy in cloud66
- Test deploy: https://debate.servesa.io

# Implementation Proposal
## Incentivize neutral, high-quality commentary

### 1) pose popular questions
- Pose a binary question (exactly two mutually-exclusive options).
  - Cost: [tbd, might work at $0…]
  - Incentive: will receive 1% of the pot if the question receives [tbd] level of engagement. Disincentive: will lose [Cost] if question does not receive [tbd] level of engagement
  - EV = P(reaching target engagement) * (expected pot * 1%) - (cost to pose question)
### 2) provide neutral, high-quality commentary
- Provide source material, comment, links to sources, etc.
  - Cost: [tbd, might work at $0…]
  - Incentive: 5% of the pot is set aside to reward comments. this sum will be split among the comments that are upvoted by *both* sides [implementation tbd]
  - Disincentive: will lose [Cost] if comment does not receive [tbd] level of upvotes by *both* sides
  - EV = P(reaching target engagement) * (expected pot * 5%) - (cost to post comment)
### 3) predict the consensus
- Select [3] helpful comments and cast vote for an answer (can change vote and comments up until the question’s time limit closes)
  - Cost: [tbd]
  - Incentive: 94% of the pot is set aside to reward players that correctly predict the consensus. This sum will be split evenly among the players that voted for the winner.
  - Disincentive: will lose [Cost] if vote is cast for the losing side.
  - EV = (expected pot * 94%) * odds of predicting consensus correctly / (strength of consensus)

## Expected Payouts
- [Payout Table](https://docs.google.com/spreadsheets/d/1xvWAPwBt0KwaNUKvZZFjgvx5Wip3DXpfOzQHlWmO9Sw/edit?usp=sharing) (google doc)

## Knobs and dials

- Game:
  - Split of pot between games: e.g. [1% / 5% / 94%]
  - How long a question is active

- pose popular questions
  - Cost to pose question (might work at $0…)
  - Engagement needed to receive award (eg, min pot size)

- provide helpful, neutral information
  - Cost to submit comment (might work at $0…)
  - [implement algorithm to determine what a “top” + “neutral” comment is, eg, # of upvotes from losing side minus upvotes from winning side… tbd]

- predict the consensus
  - number of comments to upvote
  - Cost to place vote


## Technical Implementation
1. User creates question
  1. MetaMask pop-up: “Debate Factory” creates “Debate Contract” for question
  2. DebateCo. (centralized) creates mongo record with h(“Debate Contract” tx hash + question metadata)
2. User Adds Comment and/or Votes
  1. MetaMask pop-up: User deposits eth into “Debate Contract” (and/or just signs a tx)
  2. DebateCo. takes h(previous mongo record hash + new tx hash + new metadata) and updates mongo record, forming a tx chain (audit trail)
3. After question has expired, DebateCo. will:
  1. check for a tie. if so, DebateCo. will cast a random vote.
  2. send the [player payouts and h(audit trail)] to “Debate Contract” to close the question. 
  3. notify the players.
4. Players can pull winnings from Debate Contract.

## Business Model
- Take flat fee per question
- Host closed questions and sell access to content + reveal which comments were most upvoted by each side (paywall/adds, etc…)
- Reputation building/access(?)
