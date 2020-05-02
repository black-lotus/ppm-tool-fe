import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProject, updateProject } from "../../actions/projectActions";
import classnames from "classnames";
import { GET_ERRORS } from "../../actions/types";
import store from "./../../store";

class UpdateProject extends Component {
  constructor() {
    super();

    this.state = {
      project_name: "",
      project_identifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { projectIdentifier } = this.props.match.params;
    this.props.getProject(projectIdentifier, this.props.history);
  }

  componentWillUnmount() {
    store.dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.project) {
      this.setState({
        project_name: nextProps.project.project_name,
        project_identifier: nextProps.project.project_identifier,
        description: nextProps.project.description,
        start_date: nextProps.project.start_date,
        end_date: nextProps.project.end_date,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedProject = {
      project_name: this.state.project_name,
      project_identifier: this.state.project_identifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };

    this.props.updateProject(updatedProject, this.props.history);
  }

  render() {
    const { errors } = this.state;

    return (
      <div>
        <div className="project">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h5 className="display-4 text-center">
                  Create / Edit Project form
                </h5>
                <hr />
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectName,
                      })}
                      placeholder="Project Name"
                      name="project_name"
                      value={this.state.project_name}
                      onChange={this.onChange}
                    />
                    {errors.projectName && (
                      <div className="invalid-feedback">
                        {errors.projectName}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="text"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.projectIdentifier,
                      })}
                      placeholder="Unique Project ID"
                      name="project_identifier"
                      value={this.state.project_identifier}
                      onChange={this.onChange}
                      disabled
                    />
                    {errors.projectIdentifier && (
                      <div className="invalid-feedback">
                        {errors.projectIdentifier}
                      </div>
                    )}
                  </div>
                  <div className="form-group">
                    <textarea
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.description,
                      })}
                      placeholder="Project Description"
                      name="description"
                      value={this.state.description}
                      onChange={this.onChange}
                    />
                    {errors.description && (
                      <div className="invalid-feedback">
                        {errors.description}
                      </div>
                    )}
                  </div>
                  <h6>Start Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.startDate,
                      })}
                      name="start_date"
                      value={this.state.start_date}
                      onChange={this.onChange}
                    />
                    {errors.startDate && (
                      <div className="invalid-feedback">{errors.startDate}</div>
                    )}
                  </div>
                  <h6>Estimated End Date</h6>
                  <div className="form-group">
                    <input
                      type="date"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.endDate,
                      })}
                      name="end_date"
                      value={this.state.end_date}
                      onChange={this.onChange}
                    />
                    {errors.startDate && (
                      <div className="invalid-feedback">{errors.endDate}</div>
                    )}
                  </div>

                  <input
                    type="submit"
                    className="btn btn-primary btn-block mt-4"
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  getProject: PropTypes.func.isRequired,
  updateProject: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  project: state.project.project,
});

export default connect(mapStateToProps, { getProject, updateProject })(
  UpdateProject
);
