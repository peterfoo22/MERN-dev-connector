import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const ProfileItem = ({profile:{
  user: {_id, name, avatar},
  status,
  company,
  location,
  skills
}}) => {

  const myStyle = {
    "max:width":"50%" 
  }

  return (
		<div classname="card text-center">
			<img
				src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
				alt=""
				style={myStyle}
				className="round-img my-1"
			/>
			<div>
				<h2>{name}</h2>
				<p>
					{status} {company && <span>at {company}</span>}
				</p>
				<p clasName="my-1">{location && <span>{location}</span>}</p>
				<Link to={`/profile/${_id}`} className="btn btn-primary">
					View Profile
				</Link>
			</div>
			<ul>
				{skills.slice(0, 4).map((skill, index) => (
					<li key={index} className="text-primary">
						<i className="fas fa-check">{skill}</i>
					</li>
				))}
			</ul>
		</div>
	);
}

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired
}

export default ProfileItem