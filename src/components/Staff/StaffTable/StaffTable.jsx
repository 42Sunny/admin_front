import React from 'react';
import { useState } from 'react';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { useStyles } from './StaffTableStyles';
import Table from 'components/Table/Table';
import CreateStaffModal from '../CreateStaffModal';
import CreateStaffButton from '../CreateStaffButton';
import SearchStaff from '../SearchStaff/SearchStaff';
import StaffPagination from '../StaffPagination';
import useStaffTable from './useStaffTable';

const tableHead = ['소속', '이름', '번호', ''];

const StaffTable = () => {
  const classes = useStyles();
  const [isVisibleStaffModal, setIsVisibleModal] = useState(false);
  const { searchValue, tableData, setSearchValue, reloadData, lazyReloadData, paginationProps } =
    useStaffTable();

  const openCreateStaffModal = () => setIsVisibleModal(true);
  const closeCreateStaffModal = () => setIsVisibleModal(false);

  return (
    <>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <div className={classes.header}>
                <h4 className={classes.title}>직원 관리</h4>
                <CreateStaffButton onClick={openCreateStaffModal} />
              </div>
            </CardHeader>
            <CardBody className={classes.body}>
              <div className={classes.bodyHeader}>
                <SearchStaff
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  reloadData={lazyReloadData}
                />
                <StaffPagination {...paginationProps} />
              </div>
              <Table tableHeaderColor="info" tableHead={tableHead} tableData={tableData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <CreateStaffModal
        open={isVisibleStaffModal}
        onClose={closeCreateStaffModal}
        reloadData={reloadData}
      />
    </>
  );
};

export default StaffTable;
