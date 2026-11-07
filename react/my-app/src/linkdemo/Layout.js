import React from 'react'
import {Link, Outlet} from "react-router-dom"

export default function Layout() {
  return (
    <div>
        Layout

        <nav>
            <ul>
                <li>
                    <Link to="/linkfile">LinkFile1</Link>
                </li>
                <li>
                    <Link to="/linkfile1">LinkFile2</Link>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </div>
  )
}
