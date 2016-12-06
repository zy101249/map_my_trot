import React from 'react';
import { Link } from 'react-router';

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      first_name: "",
      last_name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    this.props.processForm(user).then(() => this.props.router.push('/'));
  }

  update(field) {
		return e => this.setState({
			[field]: e.currentTarget.value
		});
	}

  renderErrors() {
		return(
			<ul>
				{this.props.errors.map((error, i) => (
					<li key={`error-${i}`}>
						{error}
					</li>
				))}
			</ul>
		);
	}

  renderNameInputBoxes(formType) {
    if (formType === 'signup') {
      return (
        <div>
          <input type="text"
            value={ this.state.first_name }
            placeholder="First Name"
            onChange={ this.update("first_name") }/>
          <input type="text"
            value={ this.state.last_name }
            placeholder="Last Name"
            onChange={ this.update("last_name") }/>
        </div>
      );
    }
  }
  render () {
    const { formType, errors } = this.props;

    let link, button;
    if (formType === 'login') {
      link = <Link to="/signup">New to MapMyTrot? Join Now</Link>;
        button = "LOG IN";
    } else {
      link = <Link to="/login">Already have an account? Login</Link>;
      button = "JOIN NOW";
    }

    return (
      <div className="session_form_container">
        <header className="session_form_header">
          <div>
            <img src="/assets/horse_logo.jpg"/>
            <h1>mapmytrot</h1>
          </div>
        </header>

        <div className="session_form_body">
          <form onSubmit={ this.handleSubmit }>
            { this.renderErrors() }
            { this.renderNameInputBoxes(formType) }
            <input type="text"
  						value={ this.state.email }
              placeholder="Email"
  						onChange={ this.update("email") }/>
            <input type="password"
							value={ this.state.password }
              placeholder="Password"
							onChange={ this.update("password") }/>
            <input type="submit" value={ button }/>
            { link }
          </form>
        </div>

      </div>
    );
  }
}

export default SessionForm;