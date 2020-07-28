import React, { Component } from 'react'
import Link from "next/link";

export default class Offline extends Component {

  render() {
    return (
      <div>
        <h4>SORRY YOU ARE OFFLINE TRY AGAIN  </h4>
        <Link href={`/`}> home</Link>
      </div>
    )
  }
}