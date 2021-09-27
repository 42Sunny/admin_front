import React, { useEffect } from 'react';
import { useState } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { useStyles } from './Styles';
import { getStaffs } from 'api/visitorApi';
import Table from 'components/Table/Table';
import CreateStaffModal from './CreateStaffModal';
import DeleteStaffButton from './DeleteStaffButton';
import CreateStaffButton from './CreateStaffButton';
import SearchStaff from './SearchStaff';
import { useFormattedPhone } from 'hooks/useFormattedPhone';

const tableHead = ['ID', '이름', '번호', ''];

const makeTableData = (rawTableData, setChangeValue) => {
  const result = [];
  rawTableData.forEach(({ id, name, phone }) => {
    result.push([
      id,
      name,
      useFormattedPhone(phone),
      <DeleteStaffButton id={id} name={name} phone={phone} setChangeValue={setChangeValue} />,
    ]);
  });
  return result;
};

const StaffTable = () => {
  const classes = useStyles();
  const [rawTableData, setRawTableData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [openCreateStaffModal, setOpenCreateStaffModal] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [changeValue, setChangeValue] = useState(true);

  useEffect(() => {
    if (changeValue === true) {
      getStaffs().then(({ data }) => {
        const tableData = makeTableData(data, setChangeValue);
        setRawTableData(tableData);
        setTableData(tableData);
        setSearchValue('');
        setChangeValue(false);
      });
    }
  }, [changeValue]);

  useEffect(() => {
    if (searchValue !== '') {
      const data = rawTableData.filter((elem) => elem[1].search(searchValue) !== -1);
      setTableData(data);
    } else {
      setTableData(rawTableData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const handleOpenCreateStaffModal = () => setOpenCreateStaffModal(true);
  const handleCloseCreateStaffModal = () => setOpenCreateStaffModal(false);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <div className={classes.cardHeader}>
                <h4 className={classes.cardTitleWhite}>직원 관리</h4>
                <CreateStaffButton onClick={handleOpenCreateStaffModal} />
              </div>
            </CardHeader>
            <CardBody>
              <div className={classes.cardBodyHeader}>
                <SearchStaff searchValue={searchValue} setSearchValue={setSearchValue} />
              </div>
              <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <CreateStaffModal
        open={openCreateStaffModal}
        onClose={handleCloseCreateStaffModal}
        setChangeValue={setChangeValue}
      />
    </>
  );
};

export default StaffTable;
