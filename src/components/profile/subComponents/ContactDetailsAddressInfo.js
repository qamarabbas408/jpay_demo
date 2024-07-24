import React from 'react';
import PropTypes from 'prop-types';

// components
import { Link } from 'react-router-dom';

function ContactDetailsAddressInfo(props) {

  const {title, address, link} = props;

  return (
    <div className='row '>
      <span className='col-1'> <i class="fa fa-house p-3"></i> </span>
      <span className='col-7 d-flex align-items-center'> {title} </span>
      <Link to={link} className="col text-primary d-flex align-items-center">{address}</Link>
    </div>
  )
}

ContactDetailsAddressInfo.propTypes = {
  title: PropTypes.string,
  address: PropTypes.string,
}

export default ContactDetailsAddressInfo;

