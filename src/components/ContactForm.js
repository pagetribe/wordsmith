import React from 'react'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";


export default class ContactForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      email: '',
      comment: '',
      formPostSuccess: false,
      isLoading: false
    }
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event) {
    const { value, name } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.createFeedback({
      userName: this.state.userName,
      email: this.state.email,
      comment: this.state.comment
    })
  }

  createFeedback(data) {
    this.setState({ isLoading: true })
    fetch('https://express-cors-api.glitch.me/api/feedback', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" }
    })
      .then((response) => {
        this.setState({ isLoading: false })
        if (response.ok) {
          this.setState({ formPostSuccess: true })
        }
        return response
      })
      // .then(function (body) {
      //   console.log(body);
      // })
  }

  render() {
    return (
      <div>
        {
          this.state.formPostSuccess ?
            <div>Thanks for leaving feedback.</div>
            :
            <form onSubmit={this.handleSubmit} className='feedback-form'>
              <TextField
                id="name"
                type="name"
                name="userName"
                label="Name"
                placeholder="Name"
                margin="normal"
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                id="email"
                type="email"
                name="email"
                label="Email"
                placeholder="Email"
                margin="normal"
                required
                fullWidth
                onChange={this.handleInputChange}
              />
              <TextField
                id="textarea"
                label="Comments"
                name="comment"
                placeholder="Your message"
                multiline
                required
                margin="normal"
                fullWidth
                onChange={this.handleInputChange}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                value="send"
              >
                {this.state.isLoading ? "submitting..." : "submit"}
              </Button>

        
              {/* <label>Name:</label>
              <input type="text" name="userName" value={this.state.userName} onChange={this.handleInputChange} />

              <label>Email:</label>
              <input type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />

              <label>Comment:</label>
              <input type="text-area" name="comment" value={this.state.comment} onChange={this.handleInputChange} required />

              <input type="submit" value={this.state.isLoading ? "submitting..." : "submit"} /> */}

            </form>
        }
      </div>
    )
  }
}