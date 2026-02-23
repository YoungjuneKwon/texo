import type { Scenario } from '../../utils/stream-simulator';

export const seoulWeatherScenario: Scenario = {
  id: 'seoul-weather',
  name: 'Seoul Weather Tomorrow',
  category: 'casual',
  systemPrompt: '내일 서울 날씨를 조사한 후, texo ui 를 이용하여 표현, 다크테마',
  content: `Tomorrow weather in Seoul

::: texo-grid
id: "weather-board"
rows: 2
columns: 2
cells:
  - id: "summary"
    at: "1:1"
    span: "1x2"
  - id: "temps"
    at: "2:1"
    span: "1x1"
  - id: "tips"
    at: "2:2"
    span: "1x1"
:::

::: texo-label
mount: "weather-board:summary"
text: "Seoul tomorrow: partly cloudy, light wind"
:::

::: texo-table
mount: "weather-board:temps"
columns: ["time", "temp", "rain"]
rows:
  - time: "Morning"
    temp: "3C"
    rain: "10%"
  - time: "Afternoon"
    temp: "9C"
    rain: "20%"
  - time: "Night"
    temp: "1C"
    rain: "5%"
:::

::: texo-button
mount: "weather-board:tips"
label: "Refresh Forecast"
action: "refresh-seoul-weather"
variant: "secondary"
:::`,
};
