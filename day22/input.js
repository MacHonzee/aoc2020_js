const string = `Player 1:
42
29
12
40
47
26
11
39
41
13
8
50
44
33
5
27
10
25
17
1
28
22
6
32
35

Player 2:
19
34
38
21
43
14
23
46
16
3
36
31
37
45
30
15
49
48
24
9
2
18
4
7
20`;

module.exports = string.split("\n\n").map(decks => decks.split(":\n")[1].split("\n").map(Number));
