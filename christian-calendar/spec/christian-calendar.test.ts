import {
  Year,
  Color,
  colorize,
  getSeason,
  computeAdvent,
  rclYear,
  yearFor,
} from '../src/libs/christian-calendar';
import DateWithoutTime from '../src/libs/dateWithoutTime';

function idate(dateString: string): DateWithoutTime {
   return new DateWithoutTime(dateString);
}

type SeasonTestCase = {
  name: string;
  startDate: DateWithoutTime;
  endDate: DateWithoutTime;
  colors: Color[];
  alternateColors: Color[];
}

function stc(name: string, startDate: string, endDate: string, colors: string[], alternateColors: string[]): SeasonTestCase {
        return {
                name: name,
                startDate: idate(startDate),
                endDate: idate(endDate),
                colors: colors.map(colorize),
                alternateColors: alternateColors.map(colorize)
        };
}

   const cases = [
          stc("Advent 1-2",    "2020-11-29", "2020-12-12", ["dark blue", "blue"], ["blue violet", "purple"]),
          stc("Advent 3",      "2020-12-13", "2020-12-19", ["pink"], ["rose" ]),
          stc("Advent 4",      "2020-12-20", "2020-12-24", ["dark blue", "blue"], ["blue violet", "purple"]),
          stc("Christmas",     "2020-12-25", "2021-01-05", ["white", "gold"], ["white", "yellow" ]),
          stc("Epiphany"     , "2021-01-06", "2021-01-06", ["white", "gold"], ["white", "yellow" ]),
          stc("ordinary time", "2021-01-07", "2021-02-13", ["green"], ["light green"]),
          stc("Transfiguration", "2021-02-14", "2021-02-16", ["white", "gold"], ["white", "yellow" ]),
          stc("Ash Wednesday", "2021-02-17", "2021-02-17", ["purple"],["gray"]),
          stc("Lent",          "2021-02-18", "2021-03-13", ["purple"],["red violet"]),
          stc("Laetare Sunday","2021-03-14", "2021-03-20", ["rose"],["rose"]),
          stc("Lent",          "2021-03-21", "2021-03-27", ["purple"],["red violet"]),
          stc("Palm Sunday"   ,"2021-03-28", "2021-03-31", ["purple"],["red"]),
          stc("Maundy Thursday","2021-04-01","2021-04-01", ["purple"],["red"]),
          stc("Good Friday"    ,"2021-04-02","2021-04-02", ["purple","black"],[]),
          stc("Holy Saturday"  ,"2021-04-03","2021-04-03", [], []),
          stc("Easter"         ,"2021-04-04","2021-04-10", ["white", "gold"], ["white", "yellow"]),
          stc("Eastertide"     ,"2021-04-11","2021-05-12", ["white", "gold"], ["red"]),
          stc("Ascension Day"  ,"2021-05-13","2021-05-13", ["white", "gold"], ["white", "yellow"]),
          stc("Eastertide"     ,"2021-05-14","2021-05-22", ["white", "gold"], ["red"]),
          stc("Pentecost"      ,"2021-05-23","2021-05-29", ["red"],["red","gold"]),
          stc("Trinity Sunday" ,"2021-05-30","2021-06-05", ["white", "gold"], ["red"]),
          stc("ordinary time"  ,"2021-06-06","2021-10-31", ["green"],["light green","bronze","aqua","olive"]),
          stc("All Saints Day" ,"2021-11-01","2021-11-01", ["red"],["white","gold"]),
          stc("ordinary time"  ,"2021-11-02","2021-11-20", ["green"],["light green","bronze","aqua","olive"]),
          stc("Christ the King","2021-11-21","2021-11-27", ["white", "gold"], ["white", "yellow"]),
    ];

describe('Year class', () => {
  it ("Should know its year number and RCL year", () => {
     const year = new Year(2021);
     expect(year.year).toBe(2021);
     expect(year.rclYear).toBe('B');
  });    

  it ("Should return the correct number of seasons for a given year.", () => { 
    const year = new Year(2021);
    const seasons = year.seasons;
    expect(year.seasons).toHaveLength(25);
  });

  
  test.each(cases)("The season $name for $startDate should be correctly initialized", (expected) => {
      const season = getSeason(expected.startDate);
      expect(season).toMatchObject(expected);
  }); // each seasaon
}); // year

describe("getSeason", () => {
  test.each([
    [new DateWithoutTime("2021-01-01"), "Christmas"],
    [new DateWithoutTime("2020-12-25"), "Christmas"],
    [new DateWithoutTime("2020-12-01"), "Advent 1-2"],
    [new DateWithoutTime("2020-04-01"), "Lent"],
    [new Date("2020/04/01"), "Lent"],
    [new DateWithoutTime("2020-11-28"), "Christ the King"],
  ])("The season for %p should be %s", (date, expectedSeason) => {
    expect(getSeason(date).name).toEqual(expectedSeason);
  });

  test("The season for 2023-12-24 should be Advent 4", () => {
    // This is an odd case because Christmas Eve and Advent 4 overlap.  Since Advent 4
    // comes before Christmas Eve most years, we want to make sure that the season
    // Advent 4 comes back first.
    expect(getSeason(new DateWithoutTime("2023-12-24"))).toMatchObject(
        stc("Advent 4",      "2023-12-24", "2023-12-24",
            ["dark blue", "blue"], ["blue violet", "purple"])
    )
  });
});


describe("computeAdvent", () => {
  test.each([
    [2021, new DateWithoutTime("2021-11-28")],
    [2022, new DateWithoutTime("2022-11-27")],
    [2023, new DateWithoutTime("2023-12-03")],
    [2024, new DateWithoutTime("2024-12-01")],
    [2025, new DateWithoutTime("2025-11-30")],
  ])("First Sunday in Advent %i should be %p", (year, expected) => {
    expect(computeAdvent(Number(year))).toEqual(expected);
  });
});

describe('RCLYear', () => {
  test.each([
    [2018,'B'],
    [2019,'C'],
    [2020,'A'],
    [2021,'B'],
    [2022,'C'],
    [2023,'A'],
    [2024,'B']
  ])('RCL year for %d should be %s', (year, expected) => {
    expect(rclYear(year)).toBe(expected);
  });
});

describe('Daily Office year', () => {
  test('Daily Office year for 2021 should be 1', () => {
    let cal = new Year(2021);
    expect(cal.dailyOfficeYear).toBe("1");
  });
  test('Daily Office year for 2022 should be 2', () => {
    let cal = new Year(2022);
    expect(cal.dailyOfficeYear).toBe("2");
  });
});

describe("yearFor", () => {
  test.each([
    [new DateWithoutTime("2021-01-01"), 2021],
    [new DateWithoutTime("2020-12-25"), 2021],
    [new DateWithoutTime("2020-12-01"), 2021],
    [new DateWithoutTime("2020-11-29"), 2021],
    [new DateWithoutTime("2020-11-28"), 2020],
    [new DateWithoutTime("2023-05-07"), 2023],
    [new DateWithoutTime("2023-09-04"), 2023],
    [new Date("2023/09/04"), 2023]
  ])("The year number for %p should be %i", (date, expectedYear) => {
    expect(yearFor(date)).toEqual(expectedYear);
  });
});
