<script setup lang="ts">
import * as d3 from 'd3'
interface Data {
  date: string
  downloads: number
}
let raw: Data[] = []
function sortData(data: Data[]) {
  return data.sort((a, b) => d3.ascending(new Date(a.date), new Date(b.date)))
}
const WIDTH = 600
const HEIGHT = 200
const MARGINTOP = 8
const xAccessor = (d: any) => d.date
const yAccessor = (d: any) => d.downloads!

const formatDate = d3.timeFormat('%Y-%m-%d')
function getText(data, d) {
  const to = xAccessor(d)
  const from = d3.timeDay.offset(new Date(to), -7)
  return `${formatDate(from)} to ${formatDate(new Date(to))}`
}
function draw() {
  const data = sortData(raw)
  const wrapper = d3.select('[data-wrapper]')
  const svg = wrapper.select('[data-chart]').append('svg').attr('viewBox', `0 0 ${WIDTH} ${HEIGHT}`)
  const xDomain = d3.extent(data, xAccessor)
  const xScale = d3.scaleTime().domain(xDomain.map(v => new Date(v!))).range([0, WIDTH])

  const yDomain = [0, d3.max(data, yAccessor)]
  const yScale = d3.scaleLinear().domain(yDomain.map(v => v!)).range([HEIGHT, MARGINTOP])

  const lineGenerator: any = d3.line()
    .x(d => xScale(new Date(xAccessor(d)!)))
    .y(d => yScale(yAccessor(d)!))
    .curve(d3.curveBumpX)

  const areaGenerator: any = d3.area()
    .x(d => xScale(new Date(xAccessor(d)!)))
    .y1(d => yScale(yAccessor(d)))
    .y0(HEIGHT)
    .curve(d3.curveBumpX)

  const area = svg.append('path')
    .datum(data)
    .attr('d', areaGenerator)
    .attr('fill', 'var(--fill)')

  const line = svg
    .append('path')
    .datum(data)
    .attr('d', lineGenerator)
    .attr('stroke', 'var(--stroke)')
    .attr('stoke-linejoin', 'round')
    .attr('stroke-width', 3)
    .attr('fill', 'transparent')

  const markerLine = svg
    .append('line')
    .attr('x1', 0)
    .attr('x2', 0)
    .attr('y1', 0)
    .attr('y2', HEIGHT)
    .attr('stroke-width', 3)
    .attr('stroke', 'var(--marker, var(--stroke))')
    .attr('opacity', 0)

  const markerDot = svg
    .append('circle')
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', 5)
    .attr('fill', 'var(--marker, var(--stroke))')
    .attr('opacity', 0)

  const bisect = d3.bisector(xAccessor)
  svg.on('mousemove', (e) => {
    const pointerCoords = d3.pointer(e)
    const [posX, posY] = [pointerCoords[0], pointerCoords[1]]
    const date = xScale.invert(posX)
    const index = bisect.center(data.map(v => ({ ...v, date: new Date(v.date) })), date)
    const d = data[index]

    const x = xScale(new Date(xAccessor(d)!))
    const y = yScale(yAccessor(d))

    markerLine.attr('x1', x).attr('x2', x).attr('opacity', 1)
    markerDot.attr('cx', x).attr('cy', y).attr('opacity', 1)
    d3.select('[data-heading]').text(getText(data, d))
    d3.select('[data-total]').text(yAccessor(d))
  })
  svg.on('mouseleave', () => {
    const lastDatum = data[data.length - 1]
    markerLine.attr('opacity', 0)
    markerDot.attr('opacity', 0)
    d3.select('[data-heading]').text('Weekly downloads')
    d3.select('[data-total]').text(yAccessor(lastDatum))
  })
}
onMounted(() => {
  d3.json<Data[]>('https://api.npoint.io/6142010a473d754de4e6').then((data) => {
    if (data)
      raw = data
    draw()
    const inputs = d3.selectAll('input[type="radio"]')
    const colors = inputs.nodes().map((input: any) => {
      return input.value
    })
    d3.select('.controls-list')
      .on('click', (e) => {
        const { value, checked } = e.target

        if (!value || !checked) return

        document.body.classList.remove(...colors)
        document.body.classList.add(value)
      })
  }).catch((err) => {
    console.log(err)
  })
})
</script>
<template>
  <div w-full h-full flex="~" flex-col items-center justify-center>
    <div text-gray-700 font-mono text-xl text-center mb-4>
      Sparkline Graph
    </div>
    <ul class="controls-list">
      <li>
        <input id="c-purple" type="radio" name="color scheme" value="purple">
        <label for="c-purple">Purple</label>
      </li>
      <li>
        <input id="c-red" type="radio" name="color scheme" value="red">
        <label for="c-red">Red</label>
      </li>
      <li>
        <input id="c-blue" type="radio" name="color scheme" value="blue">
        <label for="c-blue">Blue</label>
      </li>
    </ul>Markup
    <div id="chart-wrapper" w-600px data-wrapper>
      <div>
        <h3 data-heading>
          Weekly downloads
        </h3>
        <p data-total>
          800
        </p>
      </div>
      <figure data-chart />
    </div>
    <div font-mono>
      Tutorial ->
      <a
        href="https://tympanus.net/codrops/2022/03/29/building-an-interactive-sparkline-graph-with-d3"
      >Sparkline Graph</a>
    </div>
  </div>
</template>

<style scoped>
svg {
  width: 100%;
  height: auto;
  outline: 1px solid;
}
figure {
  margin: 0;
  aspect-ratio: 6 / 2;
}
</style>
