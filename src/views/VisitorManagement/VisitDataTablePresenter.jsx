import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { useContext } from 'react';
import { TABLE_HEAD } from './Define';
import { VisitorManagementContext } from '../../contexts/VisitorManagementContext';
import VisitDataTableHeader from './VisitDataTableHeader';
import Table from 'components/Table/Table';
import VisitDataTableBodyHeader from './VisitDataTableBodyHeader';

const VisitDataTablePresenter = () => {
  const {
    checkGaepo,
    setCheckGaepo,
    checkSeocho,
    setCheckSeocho,
    tableData,
    searchOption,
    setSearchOption,
    searchValue,
    setSearchValue,
  } = useContext(VisitorManagementContext);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <VisitDataTableHeader />
            </CardHeader>
            <CardBody>
              <VisitDataTableBodyHeader
                setCheckGaepo={setCheckGaepo}
                setCheckSeocho={setCheckSeocho}
                checkGaepo={checkGaepo}
                checkSeocho={checkSeocho}
                searchOption={searchOption}
                setSearchOption={setSearchOption}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
              />
              <Table tableHeaderColor="info" tableHead={TABLE_HEAD} tableData={tableData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridItem>
    </GridContainer>
  );
};

export default VisitDataTablePresenter;
