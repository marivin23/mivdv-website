import React from 'react';
import {PAGES} from "../../constants/pages";
import {withRouter} from "next/router";

class Header extends React.Component {

    static async getInitialProps() {
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (<div className='fixed top-0 z-1 flex justify-between w-screen h-header-height backdrop-filter backdrop-blur-lg px-10 pt-8'>
            <div
                className='bg-mivdv-logo bg-no-repeat w-logo-width h-logo-height items-center cursor-pointer'/>

            <div className='flex flex-row justify-between items-center w-36'>
                {Object.keys(PAGES).map(page => {
                    return <div
                        key={page}
                        className={this.props.router.pathname === PAGES[page] ? 'text-white text-xl font-header-links cursor-pointer font-bold' :
                            'text-white text-xl font-header-links cursor-pointer'}>
                            {this.props.router.pathname === PAGES[page] ? `/ ${page}` : page}
                    </div>
                })}
            </div>
        </div>)
    }
}

export default withRouter(Header);
