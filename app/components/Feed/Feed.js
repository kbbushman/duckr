import React from 'react'
import PropTypes from 'prop-types'
import { DuckContainer } from 'containers'
import { newDuckContainer, header } from './styles.css'
import { errorMsg } from 'sharedStyles/styles.css'

function NewDucksAvailable ({handleClick}) {
  return (
    <div className={newDuckContainer} onClick={handleClick}>
      {'New Ducks Available'}
    </div>
  )
}

const Feed = (props) => {
  return props.isFetching === true
    ? <h1 className={header}>Fetching</h1>
    : <div>
      {props.newDucksAvailable ? <NewDucksAvailable handleClick={props.resetNewDucksAvailable} /> : null}
      {props.duckIds.length === 0
        ? <p className={header}>This is unfortunate.<br /> It appears there are no ducks yet 😞</p>
        : null}
      {props.duckIds.map((id) => (
        <DuckContainer key={id} duckId={id} />
      ))}
      {props.error ? <p className={errorMsg}>{props.error}</p> : null}
    </div>
}

NewDucksAvailable.propTypes = {
  handleClick: PropTypes.func.isRequired,
}

Feed.propTypes = {
  duckIds: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  newDucksAvailable: PropTypes.bool.isRequired,
  resetNewDucksAvailable: PropTypes.func.isRequired,
}

export default Feed
