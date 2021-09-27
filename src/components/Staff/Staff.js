import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import {
  buttonLabel,
  cardSubTitle,
  cardTitle,
  confirmDeleteMessage,
  nameLabelText,
  phoneLabelText,
} from './Variable';
import { handleChange, handleClick } from './Handler';
import { useStyles } from './Styles';
import { getStaffs } from 'api/visitorApi';
import Table from 'components/Table/Table';
import { deleteStaff } from 'api/visitorApi';
import { Icon, Modal } from '@material-ui/core';

const tableHead = ['ID', '이름', '번호', ''];

// eslint-disable-next-line no-unused-vars
const DeleteStaffButton = ({ id, name, phone }) => {
  const classes = useStyles();

  return (
    <div className={classes.deleteButtonBox}>
      <button
        onClick={() => {
          if (window.confirm(confirmDeleteMessage(name, phone)) === true) deleteStaff(id);
        }}
        className={classes.deleteButton}
      >
        <Icon>remove_circle</Icon>
      </button>
    </div>
  );
};

const makeTableData = (rawTableData) => {
  const result = [];
  rawTableData.forEach(({ id, name, phone }) => {
    result.push([id, name, phone, <DeleteStaffButton id={id} name={name} phone={phone} />]);
  });
  return result;
};

const Staff = () => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [rawTableData, setRawTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getStaffs().then(({ data }) => {
      const tableData = makeTableData(data);
      setRawTableData(tableData);
      setTableData(tableData);
    });
  }, []);

  useEffect(() => {
    if (searchValue !== '') {
      const data = rawTableData.filter((elem) => elem[1].search(searchValue) !== -1);
      setTableData(data);
    } else {
      setTableData(rawTableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>직원 관리</h4>
            </CardHeader>
            <CardBody>
              <div className={classes.cardBodyHeader}>
                <div className={classes.searchBox}>
                  <Icon className={classes.searchIcon}>search</Icon>
                  <input
                    className={classes.searchInput}
                    placeholder="이름을 입력하세요"
                    onChange={({ target: { value } }) => {
                      setSearchValue(value);
                    }}
                    value={searchValue}
                  />
                </div>
                <Icon color="info" onClick={handleOpen} className={classes.addButton}>
                  add_circle
                </Icon>
              </div>
              <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <Modal open={isOpen} onClose={handleClose}>
        <div className={classes.StaffInputBox}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>{cardTitle}</h4>
              <p className={classes.cardCategoryWhite}>{cardSubTitle}</p>
            </CardHeader>
            <CardBody>
              <div className={classes.inputBox}>
                <input
                  name={'name'}
                  value={name}
                  onChange={(event) => handleChange(event, setName, setPhone)}
                  placeholder={nameLabelText}
                  className={classes.input}
                />
                <input
                  name={'phone'}
                  value={phone}
                  type={'tel'}
                  color={'info'}
                  onChange={(event) => handleChange(event, setName, setPhone)}
                  placeholder={phoneLabelText}
                  className={classes.input}
                />
                <RegularButton
                  color="info"
                  onClick={() => {
                    handleClick(name, phone, setName, setPhone, handleClose);
                  }}
                  className={classes.inputButton}
                >
                  {buttonLabel}
                </RegularButton>
              </div>
            </CardBody>
          </Card>
        </div>
      </Modal>
    </>
  );
};

export default Staff;
