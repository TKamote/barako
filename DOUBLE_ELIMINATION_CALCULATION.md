# Double Elimination Bracket - Complete Calculation

## Rules:
1. Higher seed always gets bye when odd numbers
2. Player eliminated only after 2 losses
3. Always favor higher seed in byes
4. Match numbering: WB first, then LB

---

## 8 PLAYERS (No QR)

### Winners Bracket:
- M5-M8: WB R1 (4 matches) → 4 losers

### Losers Bracket:
**Entry:** 4 WB R1 losers

- **M12-M13: LB R1** - 4 players → 2 matches → 2 winners
  - M12: WB R1 Loser #1 (seed 8) vs WB R1 Loser #2 (seed 7)
  - M13: WB R1 Loser #3 (seed 6) vs WB R1 Loser #4 (seed 5)
  - **Output:** 2 winners

**Entry:** 2 LB R1 winners + 2 WB R2 losers

- **M14-M15: LB R2** - 4 players → 2 matches → 2 winners
  - M14: LB R1 Winner (higher seed) vs WB R2 Loser #1 (lower seed)
  - M15: LB R1 Winner (lower seed) vs WB R2 Loser #2 (higher seed)
  - **Output:** 2 winners

**Entry:** 2 LB R2 winners + 1 WB R3 loser = 3 players

- **M16-M17: LB R3** - 3 players → Need 2 matches (1 gets bye)
  - Higher seed (from LB R2) gets BYE → advances directly
  - M16: Lower seed LB R2 winner vs WB R3 Loser
  - M17: Higher seed LB R2 winner (bye) vs M16 Winner
  - **Output:** 1 winner (LB Final winner)

**Total LB Matches:** M12-M17 (6 matches)

---

## 9 PLAYERS (1 QR match)

### Winners Bracket:
- M1: QR → 1 loser (lower seed, from QR match)
- M5-M8: WB R1 (4 matches, 1 has bye) → 3 actual matches → 3 losers

### Losers Bracket:
**Entry:** 1 QR loser

- **M12: LB Qualifying** - 1 player → Gets BYE (higher seed of the 2 QR players, but lost)
  - Actually, if only 1 QR loser, they wait for LB R1
  - OR: Skip LB Qualifying, QR loser goes directly to LB R1 with bye

**Option A: Skip LB Qualifying**
**Entry:** 1 QR loser (gets bye) + 3 WB R1 losers = 4 players

- **M12-M13: LB R1** - 4 players → 2 matches → 2 winners
  - QR loser (higher seed) gets BYE → advances
  - M12: WB R1 Loser #1 vs WB R1 Loser #2
  - M13: WB R1 Loser #3 vs [BYE - QR loser]
  - **Output:** 2 winners (1 from bye, 1 from match)

**Entry:** 2 LB R1 winners + 2 WB R2 losers = 4 players

- **M14-M15: LB R2** - 4 players → 2 matches → 2 winners
  - M14: Higher seed LB R1 winner vs Lower seed WB R2 loser
  - M15: Lower seed LB R1 winner vs Higher seed WB R2 loser
  - **Output:** 2 winners

**Entry:** 2 LB R2 winners + 1 WB R3 loser = 3 players

- **M16-M17: LB R3** - 3 players → 2 matches (1 bye)
  - Higher seed LB R2 winner gets BYE
  - M16: Lower seed LB R2 winner vs WB R3 Loser
  - M17: Higher seed (bye) vs M16 Winner
  - **Output:** 1 winner

**Total LB Matches:** M12-M17 (6 matches)

---

## 10 PLAYERS (2 QR matches)

### Winners Bracket:
- M1-M2: QR (2 matches) → 2 losers
- M5-M8: WB R1 (4 matches, 2 have byes) → 2 actual matches → 2 losers

### Losers Bracket:
**Entry:** 2 QR losers

- **M12: LB Qualifying** - 2 players → 1 match → 1 winner
  - M12: QR Loser #1 vs QR Loser #2
  - **Output:** 1 winner (gets bye to LB R1)

**Entry:** 1 LB Qualifying winner (gets bye) + 2 WB R1 losers = 3 players

- **M13-M14: LB R1** - 3 players → 2 matches (1 bye)
  - LB Qualifying winner (higher seed) gets BYE → advances
  - M13: WB R1 Loser #1 vs WB R1 Loser #2
  - M14: LB Qualifying winner (bye) vs M13 Winner
  - **Output:** 2 winners

**Entry:** 2 LB R1 winners + 2 WB R2 losers = 4 players

- **M15-M16: LB R2** - 4 players → 2 matches → 2 winners
  - M15: Higher seed LB R1 winner vs Lower seed WB R2 loser
  - M16: Lower seed LB R1 winner vs Higher seed WB R2 loser
  - **Output:** 2 winners

**Entry:** 2 LB R2 winners + 1 WB R3 loser = 3 players

- **M17-M18: LB R3** - 3 players → 2 matches (1 bye)
  - Higher seed LB R2 winner gets BYE
  - M17: Lower seed LB R2 winner vs WB R3 Loser
  - M18: Higher seed (bye) vs M17 Winner
  - **Output:** 1 winner

**Total LB Matches:** M12-M18 (7 matches)

---

## 11 PLAYERS (3 QR matches)

### Winners Bracket:
- M1-M3: QR (3 matches) → 3 losers
- M5-M8: WB R1 (4 matches, 3 have byes) → 1 actual match → 1 loser

### Losers Bracket:
**Entry:** 3 QR losers

- **M12-M13: LB Qualifying** - 3 players → 2 matches (1 bye)
  - Higher seed QR loser gets BYE
  - M12: Lower seed QR Loser #1 vs QR Loser #2
  - M13: Higher seed QR loser (bye) vs M12 Winner
  - **Output:** 2 winners

**Entry:** 2 LB Qualifying winners + 1 WB R1 loser = 3 players

- **M14-M15: LB R1** - 3 players → 2 matches (1 bye)
  - Higher seed (from LB Qualifying) gets BYE
  - M14: Lower seed LB Qualifying winner vs WB R1 Loser
  - M15: Higher seed (bye) vs M14 Winner
  - **Output:** 2 winners

**Entry:** 2 LB R1 winners + 2 WB R2 losers = 4 players

- **M16-M17: LB R2** - 4 players → 2 matches → 2 winners
  - M16: Higher seed LB R1 winner vs Lower seed WB R2 loser
  - M17: Lower seed LB R1 winner vs Higher seed WB R2 loser
  - **Output:** 2 winners

**Entry:** 2 LB R2 winners + 1 WB R3 loser = 3 players

- **M18-M19: LB R3** - 3 players → 2 matches (1 bye)
  - Higher seed LB R2 winner gets BYE
  - M18: Lower seed LB R2 winner vs WB R3 Loser
  - M19: Higher seed (bye) vs M18 Winner
  - **Output:** 1 winner

**Total LB Matches:** M12-M19 (8 matches)

---

## 12 PLAYERS (4 QR matches)

### Winners Bracket:
- M1-M4: QR (4 matches) → 4 losers
- M5-M8: WB R1 (4 matches, all have byes) → 4 actual matches → 4 losers

### Losers Bracket:
**Entry:** 4 QR losers

- **M12-M13: LB Qualifying** - 4 players → 2 matches → 2 winners
  - M12: QR Loser #1 (seed 11) vs QR Loser #2 (seed 12)
  - M13: QR Loser #3 (seed 9) vs QR Loser #4 (seed 10)
  - **Output:** 2 winners

**Entry:** 2 LB Qualifying winners + 4 WB R1 losers = 6 players

- **M14-M16: LB R1** - 6 players → 3 matches → 3 winners
  - Higher seed LB Qualifying winner gets matched with lower seed WB R1 loser
  - M14: LB Qualifying Winner #1 (higher seed) vs WB R1 Loser #1 (lower seed)
  - M15: LB Qualifying Winner #2 (lower seed) vs WB R1 Loser #2 (higher seed)
  - M16: WB R1 Loser #3 vs WB R1 Loser #4
  - **Output:** 3 winners

**Entry:** 3 LB R1 winners + 2 WB R2 losers = 5 players

- **M17-M19: LB R2** - 5 players → 3 matches (1 bye)
  - Highest seed LB R1 winner gets BYE
  - M17: Lower seed LB R1 winner #1 vs WB R2 Loser #1 (lower seed)
  - M18: Lower seed LB R1 winner #2 vs WB R2 Loser #2 (higher seed)
  - M19: Highest seed LB R1 winner (bye) vs M17 Winner
  - **Output:** 3 winners (but wait, M19 winner + M18 winner = 2, not 3)

Wait, let me recalculate LB R2:
- 3 LB R1 winners + 2 WB R2 losers = 5 players
- Need 3 matches, but that gives 3 winners, not right...

Actually: 5 players → 2 matches + 1 bye = 3 players advance? No...
5 players → Need 3 matches:
- Match 1: 2 players → 1 winner
- Match 2: 2 players → 1 winner  
- Bye: 1 player advances
- Total: 3 players advance

But then match 3 needs the bye player vs one of the winners...

Let me recalculate:
- **M17-M18: LB R2** - 5 players → First create 2 matches from 4 players
  - M17: LB R1 Winner #1 (lower seed) vs WB R2 Loser #1 (lower seed)
  - M18: LB R1 Winner #2 (higher seed) vs WB R2 Loser #2 (higher seed)
  - Highest seed LB R1 winner gets BYE
  - **Output:** 2 winners from matches + 1 from bye = 3 players

Wait, that's 3 players. Then need:
- **M19: LB R2 Consolidation** - 3 players → Match between one winner and bye player?
  - Actually, the 3 players all advance to LB R3, but we pair them properly...

I think the structure should be:
- **M17-M18: LB R2** - 5 players
  - Highest seed gets BYE to next round
  - M17: Player 2 vs Player 3 → Winner 1
  - M18: Player 4 vs Player 5 → Winner 2
  - **Output:** 1 from bye + 2 winners = 3 players to LB R3

**Entry:** 3 LB R2 players + 1 WB R3 loser = 4 players

- **M19-M20: LB R3** - 4 players → 2 matches → 2 winners
  - M19: Highest seed (from LB R2 bye) vs WB R3 Loser
  - M20: LB R2 Winner #1 vs LB R2 Winner #2
  - **Output:** 2 winners

**Entry:** 2 LB R3 winners = 2 players

- **M21: LB Final** - 2 players → 1 match → 1 winner (LB Winner)
  - M21: LB R3 Winner #1 vs LB R3 Winner #2
  - **Output:** 1 winner (LB Winner, advances to championship)

**Total LB Matches:** M12-M21 (10 matches)

---

This is getting complex. Should I proceed with implementing a dynamic calculation system, or do you want to review/adjust these calculations first?

