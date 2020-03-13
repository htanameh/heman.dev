import React, { Component } from 'react';
import { Chart } from 'frappe-charts/dist/frappe-charts.esm.js';
import 'frappe-charts/dist/frappe-charts.min.css'

class FrappeChart extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    const { title, data = {}, type = 'bar', height = 200, colors = [], ...rest} = this.props
    let chart = new Chart(this.chart, {
      title,
      data,
      type,
      height,
      colors,
      ...rest
    })
  }

  render() {
    return <div ref={chart => (this.chart = chart)} />
  }
}

export default FrappeChart;