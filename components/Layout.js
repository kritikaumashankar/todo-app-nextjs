import Head from 'next/head';
import Navbar from './Navbar';
const Layout= ({ children }) =>(
  <div className="container">
    <Head>
      <title> Todo App </title>
      <link rel="stylesheet" href="https://bootswatch.com/4/sketchy/bootstrap.min.css" />
    </Head>
    <Navbar />
    {children}
  </div>
)

export default Layout