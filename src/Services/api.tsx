export interface WorldData {
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
}

export interface CountryInfo {
  _id: number;
  lat: number;
  long: number;
  flag: string;
  iso3: string;
}

export interface CountryData {
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

export interface HistoricalData {
  cases: { [key: string]: number };
  deaths: { [key: string]: number };
  recovered: { [key: string]: number };
}

const BASE_URL = "https://disease.sh/v3/covid-19";

export const getWorldData = async (): Promise<WorldData> => {
  const response = await fetch(`${BASE_URL}/all`);
  return response.json();
};

export const getCountriesData = async (): Promise<CountryData[]> => {
  const response = await fetch(`${BASE_URL}/countries`);
  return response.json();
};

export const getHistoricalData = async (): Promise<HistoricalData> => {
  const response = await fetch(`${BASE_URL}/historical/all?lastdays=all`);
  return response.json();
};
