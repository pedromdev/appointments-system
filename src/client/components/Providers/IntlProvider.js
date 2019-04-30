import {IntlProvider} from 'react-intl';
import pt from 'react-intl/locale-data/pt';
import {connect} from 'react-redux';

console.log(pt);

export default connect(
  state => ({
    locale: state.locale
  })
)(IntlProvider);