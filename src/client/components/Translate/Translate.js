import React, {Fragment} from 'react';
import ReactTranslate from 'react-translate-component';

const Translate = (props) => (
  <ReactTranslate {...props} component={Fragment} />
);

Translate.propTypes = ReactTranslate.propTypes;

export default Translate;