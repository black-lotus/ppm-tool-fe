import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";
import { Link } from "react-router-dom";
import {
  getProjectTask,
  updateProjectTask,
} from "../../../actions/backlogActions";
import PropTypes from "prop-types";

class UpdateProjectTask extends Component {
  constructor() {
    super();

    this.state = {
      id: "",
      project_sequence: "",
      summary: "",
      acceptance_criteria: "",
      status: "",
      priority: "",
      due_date: "",
      project_identifier: "",
      create_at: "",
      errors: {},
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    const { projectIdentifier, projectSequence } = this.props.match.params;
    this.props.getProjectTask(
      projectIdentifier,
      projectSequence,
      this.props.history
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.project_task) {
      this.setState({
        id: nextProps.project_task.id,
        project_sequence: nextProps.project_task.project_sequence,
        summary: nextProps.project_task.summary,
        acceptance_criteria: nextProps.project_task.acceptance_criteria,
        status: nextProps.project_task.status,
        priority: nextProps.project_task.priority,
        due_date: nextProps.project_task.due_date,
        project_identifier: nextProps.project_task.project_identifier,
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const updateProjectTask = {
      id: this.state.id,
      project_sequence: this.state.project_sequence,
      summary: this.state.summary,
      acceptance_criteria: this.state.acceptance_criteria,
      status: this.state.status,
      priority: this.state.priority,
      due_date: this.state.due_date,
      project_identifier: this.state.project_identifier,
    };

    console.log(updateProjectTask);
    this.props.updateProjectTask(
      this.state.project_identifier,
      this.state.project_sequence,
      updateProjectTask,
      this.props.history
    );
  }

  render() {
    const { projectIdentifier } = this.props.match.params;
    const { errors } = this.state;

    return (
      <div className="add-PBI">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link
                to={`/projectBoard/${projectIdentifier}`}
                className="btn btn-light"
              >
                Back to Project Board
              </Link>
              <h4 className="display-4 text-center">Update Project Task</h4>
              <p className="lead text-center">
                Project Name: {this.state.project_identifier} | Project Task ID:{" "}
                {this.state.project_sequence}{" "}
              </p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.summary,
                    })}
                    name="summary"
                    placeholder="Project Task summary"
                    value={this.state.summary}
                    onChange={this.onChange}
                  />
                  {errors.summary && (
                    <div className="invalid-feedback">{errors.summary}</div>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.acceptance_criteria,
                    })}
                    placeholder="Acceptance Criteria"
                    name="acceptance_criteria"
                    value={this.state.acceptance_criteria}
                    onChange={this.onChange}
                  />
                  {errors.acceptance_criteria && (
                    <div className="invalid-feedback">
                      {errors.acceptance_criteria}
                    </div>
                  )}
                </div>
                <h6>Due Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.due_date,
                    })}
                    name="due_date"
                    value={this.state.due_date}
                    onChange={this.onChange}
                  />
                  {errors.due_date && (
                    <div className="invalid-feedback">{errors.due_date}</div>
                  )}
                </div>
                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.priority,
                    })}
                    name="priority"
                    value={this.state.priority}
                    onChange={this.onChange}
                  >
                    <option value={0}>Select Priority</option>
                    <option value={1}>High</option>
                    <option value={2}>Medium</option>
                    <option value={3}>Low</option>
                  </select>
                  {errors.priority && (
                    <div className="invalid-feedback">{errors.priority}</div>
                  )}
                </div>

                <div className="form-group">
                  <select
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": errors.status,
                    })}
                    name="status"
                    value={this.state.status}
                    onChange={this.onChange}
                  >
                    <option value="">Select Status</option>
                    <option value="TO_DO">TO DO</option>
                    <option value="IN_PROGRESS">IN PROGRESS</option>
                    <option value="DONE">DONE</option>
                  </select>
                  {errors.priority && (
                    <div className="invalid-feedback">{errors.status}</div>
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
    );
  }
}

UpdateProjectTask.propTypes = {
  getProjectTask: PropTypes.func.isRequired,
  updateProjectTask: PropTypes.func.isRequired,
  project_task: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project_task: state.backlog.project_task,
  errors: state.errors,
});

export default connect(mapStateToProps, { getProjectTask, updateProjectTask })(
  UpdateProjectTask
);
