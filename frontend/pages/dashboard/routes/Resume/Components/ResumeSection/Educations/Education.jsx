import React, { PropTypes } from 'react';

import DateSlider from 'COMPONENTS/DateSlider'
import Input from 'COMPONENTS/Input';
import Selector from 'COMPONENTS/Selector';
import dateHelper from 'UTILS/date';
import { EDUCATIONS } from '../../../helper/const_value';
import styles from '../../../styles/resume.css';

class Education extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entranceOpen: false,
      graduationOpen: false
    };
    this.onDateChange = this.onDateChange.bind(this);
    this.handleEntranceFocus = this.handleEntranceFocus.bind(this);
    this.handleGraduationFocus = this.handleGraduationFocus.bind(this);
  }

  handleEntranceFocus({ focused: entranceOpen }) {
    this.setState({ entranceOpen });
  }

  handleGraduationFocus({ focused: graduationOpen }) {
    this.setState({ graduationOpen });
  }

  onDateChange(type) {
    const {handleEduChange} = this.props;
    return (momentTime) => {
      const time = momentTime.format('L');
      handleEduChange && handleEduChange(type)(time);
    }
  }

  render() {
    const {edu, handleEduChange, deleteEdu, index} = this.props;
    const {entranceOpen, graduationOpen} = this.state;
    const {
      school,
      major,
      education,
      startTime,
      endTime,
    } = edu;

    return (
      <div className={styles["resume_piece_container"]}>
        <div className={styles["resume_delete"]} onClick={deleteEdu}>
          <i className="fa fa-trash-o" aria-hidden="true"></i>
        </div>
        <div className={styles["resume_title"]}>
          教育经历
        </div>
        <div className={styles["resume_wrapper"]}>
          <Input
            value={school}
            style="flat"
            placeholder="学校名称"
            onChange={handleEduChange('school')}
          />
        </div>
        <div className={styles["resume_wrapper"]}>
          <Input
            value={major}
            style="flat"
            placeholder="院系 & 专业"
            onChange={handleEduChange('major')}
          />
          <Selector
            value={education}
            options={EDUCATIONS}
            style="flat"
            onChange={handleEduChange('education')}
          />
        </div>
        <div className={styles["resume_wrapper"]}>
          <DateSlider
            initialStart={startTime}
            initialEnd={endTime}
            maxDate={dateHelper.date.afterYears(5)}
            startText="入学时间"
            endText="毕业时间"
            pushInterval="year"
            onStartChange={handleEduChange('startTime')}
            onEndChange={handleEduChange('endTime')}
          />
        </div>
      </div>
    )
  }
}

export default Education;
