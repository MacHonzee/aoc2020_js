const Grid2d = require("../utils/2d-grid");

const string = `.#..........#......#..#.....#..
....#.............#.#....#..#..
.....##...###....#..#.......#..
.#....#..#......#........#.....
.#.........###.#..........##...
...............##........#.....
#..#..........#..##..#....#.#..
....#.##....#..#...#.#....#....
...###...#............#.#......
#.........#..#...............#.
#.#...........#...............#
..#.#......#..###.#...#..##....
.....#..#..#..#............#...
......#.......#.....#....##....
#......#...#.......#.#.#.......
...........##.#.............#..
.#.........#..#.####...........
..#...........#....##..........
#...........#.......#..#.#.....
.....##...#.....#..##..#..#....
#.#..........................#.
##.....#..........#.......##..#
....#..#............#.#.#......
.......#.......#..#............
...#.#..........#..#.....#.....
.....#...##..##.....##........#
.#.....#........##............#
..#....#.#...#.....#.##........
........##.....#......##...##..
......#..................#.....
..##......##.....##...##.......
......#..#...##......##........
.#..#..#.#.....................
.#....#.#...#....#.......##...#
.####.#..##...#.#.#....#...#...
.#....#.....#...#..#.........##
...........#.#####.#.#..##..#..
.#......##...#..###.#.#....#...
...#.....#........#..###...#...
.......#................##.#...
.##...#.#..................#...
..#........#....#..........#..#
..#.........#..................
...#.#..........#.#..##........
...#.##..........##...........#
...........#..#........#.......
.#....#.#...........#....#.##..
.#...#..#............#....#.#..
...#..#...#.........####.#.#...
..#...#...........###..#...##.#
......##...#.#.#....##....#....
#..#.#.....##....#.......#...#.
.#.....#.....#..#..##..........
................#.#.#...##.....
.#.....#............#......#...
...#...#..#.#....######.....#..
..#..........##......##.....#..
......#..#.##...#.#............
....#.......#..#...#..#.#......
#......##.#..#........#.....#..
..#.........#..#.........#.....
..#.........##.......#.#.#..##.
...#....##.................#.#.
...#........##.#.......#.##..##
....#.#...#...#....#...........
.........#....##........#......
...#........#..#.......#...#...
#.......#....#...#...........#.
.......#......#...##...........
.#.#......##.#.......#..#...#..
.#.....##.#...#......#..#......
........#.............#.#..#..#
#...........#....#.....#.##.#.#
................#...#........##
#..#.##..#.....#...##.#........
#.....#.#..##......#.#..#..###.
....#...#.....#................
......#...#..##...........#....
......#.........##.#...#......#
#...#.#.....#..#.#..#..#......#
...#.#..#..#.#........###.#....
..#...#.......#.#.......#......
...#....#.....#.......#......#.
#...........#....#..#..#.......
..........##......##.........##
##............#..#.#...#..#.#..
..#.##....##...##..#...#.......
............##.##..###..#..#...
......#....##...##.........#...
......#..#.#......####..#......
..............#....#..#..##....
...#.#..#...##.#.......#.#.....
...#.#....#.......#..#..#..##..
..........#.........#..........
...#.....#............#.....##.
....#.#......................#.
.........#...#.#...#...........
...#........#..##.....#...#.#..
......##.....#.#..#...###.#...#
#....#..#.#.....#...#..........
.#.##.###.........#..##.#....#.
#.........#....#........#...#..
...........#...............#..#
###....................#....#..
.................#....#.....#..
..........#.........#.......#..
........#..#....#.....##.......
#...##.#...#.#.#............#..
....#.........##.#.#..#...###..
.##..............#...#.....##.#
###...#..................#...#.
.....#..#...#..#...#...........
.#.................#...#..#..#.
.#.........###...#.##......###.
.####............#......#..#...
....#........#..#.#....#..##..#
..#....#.#...#.#.....##....#...
..###..#..#....##....#..#..#...
...#.#.....#.#....#.....#......
.....#..........#.#............
.......#...........#.#..#..#...
......##........#.....#.......#
..#.#.....##............#..##..
....#.#........#...........##..
#......#..##........#.....#....
#...#...###..............##....
#..#........#........#.....##.#
......##.####........#..#....#.
...##..#.##.....#...#...#..#...
#..............###.##..##......
......................#.....#..
.........#.#.......#...##.#....
....#......#..........###..#...
#...####.#.................#..#
##.#....#....#.....##..#....#.#
..#.....#..##.........#.#..#.#.
.....#.....#...................
#....##.#.........###....#.....
#........#.#.......#.#.........
.##.#...#.....#...#.......##.##
#..#.............#.............
..........#.........####.......
..##..............#..#.#.......
..#.#.....#........#......##...
#.#.......#.#................#.
.#...#........#....##....#.##..
.#..#...#...#......#.#.........
......##............#.........#
.#....#.#.#.........#..#..##...
#....#......#.......###........
.......#........##..#...#..###.
#.##..........#..###..#..#.#...
.#..#....#..........#.#.##.....
#..#...#.#...#..#..#.#...#.....
.........#...#.#............#..
#..#.............#......##.##..
...##.......#..................
....#......#...#.....#......#..
.....##..#......#....#....#....
....#...#...#...#.....#........
.#....#........##....#..#.#...#
#.......#..#......#......#...#.
..............#......#......#..
#......#..##...#........#....#.
#..#..#..#.....#..#........#...
#...#.....#...#..........#...##
........#.......#...#.....#.#..
...................##.......#..
.#......#........#.##..#....#..
.....#.....#...#..#..#......#..
........##.#..##.........#....#
.........#.......#.............
............#.###.###..#.#.....
.............#....#...........#
..#.....#.#..##.##........#....
...#....#....#.........#.....#.
.#............#......#.........
..#.#..........##.##......#.#..
....#.........................#
..........##...................
#.......#.#..............#...#.
...##..#..##...##.#..#.#.#.....
...########.#..##....#.........
##.#........##.....#........#..
#.#.....#........#..#....#...#.
..#............#.......###.##.#
#.#............................
...#.#.#....#..........#..#....
..###.#.....#.#..#.............
#........#..........#.#..#.....
...........#..#....#.........#.
..#............#.....#.#.......
#.#............#..#.....#.#.#..
...#...#.......................
.#.#.#...##.............#..#..#
..#.........#..#.....##....##..
.#...#............#.......#..##
....#..#.#.#...####............
#.......#....#..##....##....#..
.....##.#....#.#..#.......#....
...........#.......#....##.#.##
..........#...#....##...#.#....
..#.............#.............#
....#..#.....#....#.#..###.#...
.......#.##.#......#...##...#.#
.#..#.#..#.#.......#....###.#..
#..........##...##.........##..
##..#......##.#.####.#.....#...
....#.#...#........#..##..#.#..
.#.............................
.##..#.#...##.....#....#.....#.
..##.........#......#.........#
.#.#........#...#.#.#....##....
.#.................##.........#
...#...............#....#......
..#...#..#..........###..#...##
..........#..#..........##..#..
...#.............#.##.#...#....
...#...........#...............
......#.........##.#...#...#...
...#.#........#..#.....#..#...#
#.#...#....##...#.....#....#...
#.#.#..#.....#.........#.......
##...........#..####...........
#..........#........###...#..#.
#..#.......#....#......###.....
..#.....#......#.###......##...
...#.##..#............#...#....
.##........#.....#.............
#....#.##..#...........##.#.#..
..#.....#.#....#.......#......#
#..#.......#............#......
#.......##....#...#..#.........
.................#..##.........
..............#..#..#.##.......
#.#.......................#..#.
..#..##...........#....#..#..#.
...#....#.......#.......#....#.
.....#.#..#.#.....#.........#.#
..#.#.........#.....#..........
...#.#.#.......#.#.......#.#..#
...##...#.#.#.....#.....##....#
##.......#.#.#.#.......#...##..
....#.#...........#......#.....
.#.....#........####...........
#......#........#.....#..#..#..
..#..#......#...##.......#....#
#........#..........#.....#.#..
.#...........#.....#.....#.....
..........#..#...#....#....##..
.....#.#..........#.....##..#..
......#.........##.............
..#..#.....##......##........#.
.#.#.#.#..#.#..#.......#.......
#.#...####.#.#....#.#........#.
....#...#.....#......#..##.....
##.........#.........#..#.#..#.
..#.#........#.#........#.##...
#....#......#...#....#.........
.##.............###....###.#...
..##.#.......#...#..#......#...
.....#.##..................#...
.....#.#...#..#................
........#..#..#...........#.#.#
....#.###.....#..#.#.....##..##
....##.#.........#..##.........
.##........#......#..###..#.##.
.........##...............#.##.
..#...............#.#...#..#.#.
....#....##.....#...#..#.....#.
#...#.....................#....
.....#.#............#...##.#.#.
...#......#.......#........##.#
.#.#..#.#....#.##.......##....#
.........#...#..##.........#...
.#...#..#....................#.
.......#...#........#.#..#.#.##
.#.............#......#..#.#...
............##.........#....#.#
#.........##..##...............
.#.#....#.#..#..........##.....
..###...#..#.#.......#..#...##.
.....#....#.#............##.#..
##.....#.#..#..#...............
...##...#......#....#..#..#....
.............#....#..#..##...##
#.......#............#....##..#
..#.##.....#.......#....#....#.
..........#...#.............###
..#....#.#..................#..
#.#...#..#...........#.........
....##..#..##..#..........#....
#...#...#.#....#.##...#.......#
#......##.#...##..#.....#......
....#.......#.#............#...
#....#...........###...........
#..#...#...#......#.#..#.......
...............................
#........##.............#.#....
.............#........#....#.##
........##.####.....##..#......
#.#.#.#.......##....##.....#...
.......#..##..#...#............
..........#...#....#..#.#.#.##.
...#........##....#...#........
#..#.##....#....#........#.....
.##...#.....##...#.............
.#...#..#.#.....#.##.....#.....
...........#.............#...#.
.#..#................#...#..#..
#..........#......##..##....#..
####..#...........#.#....#.....
..#.#.##..#...##........#....##
.#.......##........#.....#.....
............#................#.
.#...#...#.....#.#....#.##..#..
..#.............#.#....#.#.....
..............#...........#....
..............#........#....#..
..........##........#..#...#...
...#.#....#.#....#..#.....#...#
..#......#...........#..#..#.#.
.....##.....#.####....#........`;

module.exports = new Grid2d(string);