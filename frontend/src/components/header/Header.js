import React from 'react'

export const Header = () => {
  return (
    <div className='--pad header'>
        <div className='--flex-between'>
            <h3>
                <span className='--fw-thin'>Welcome, </span>
                <span className='--color-danger'>Kavindu </span>

            </h3>
            <button className='--btn --btn-danger'>
                LogOut
            </button>
        </div>
        <hr />
    </div>
  )
}
export default Header;
