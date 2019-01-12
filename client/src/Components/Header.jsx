import React from 'react';
import { Menu, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import responsive from './Responsive';

const options = [
    { key: 1, text: 'Gotowa Pizza', value: '/pizza' },
    { key: 2, text: 'Własna Pizza', value: '/createpizza' },
    { key: 3, text: 'Dania obiadowe', value: '/meal' },
    { key: 4, text: 'Napoje', value: '/drink'},
  ]


class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {}
        this.dropdownItemClick = this.dropdownItemClick.bind(this);
    }

    dropdownItemClick = (event, data) => {
        Redirect()
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    render() {
        const { activeItem } = this.state;
        const { width, height } = this.props;
        console.log({ width, height });
        return (
            <Menu fitted="vertically" stackable size="massive" fluid widths={5} className="Header">
                <Dropdown icon="heart"
                           text="PIZZA"
                           simple
                           item >
                    <Dropdown.Menu>
                        <Dropdown.Item text="Gotowa Pizza" as={Link} to="/pizza" />
                        <Dropdown.Item text="Własna Pizza" as={Link} to="/createpizza" />
                        <Dropdown.Item text="Dania obiadowe" as={Link} to="/meal" />
                        <Dropdown.Item text="Napoje" as={Link} to="/drink" />
                    </Dropdown.Menu>
                </Dropdown>
                <Menu.Item name="home"
                           active={activeItem === 'home'}
                           onClick={this.handleItemClick}
                           icon="home"
                           content="GŁÓWNA"
                           as={Link}
                           to="/home" />
                <Menu.Item name='login'
                           active={activeItem === 'login'}
                           onClick={this.handleItemClick}
                           icon="user"
                           content="PRACOWNIK"
                           as={Link}
                           to="/worker" />
                <Menu.Item name='contact'
                           active={activeItem === 'contact'}
                           onClick={this.handleItemClick}
                           icon="phone"
                           content="KONTAKT"
                           as={Link}
                           to="/contact" />
                <Menu.Item name='basket'
                           active={activeItem === 'basket'}
                           onClick={this.handleItemClick}
                           icon="shopping basket"
                           content="KOSZYK"
                           as={Link}
                           to="/basket" />
            </Menu>
        )
    }
}

export default responsive(Header);