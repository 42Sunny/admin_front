import useStyles from './VisitorManagementStyles';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import { useContext } from 'react';
import { VISITOR_TABLE_HEAD } from './Define';
import { VisitorManagementContext } from '../../contexts/VisitorManagementContext';
import VisitDataTableHeader from './VisitDataTableHeader';
import Table from 'components/Table/Table';
import VisitDataTableBodyHeader from './VisitDataTableBodyHeader';
import VisitDataTableCount from './VisitDataTableCount';

const VisitDataTablePresenter = () => {
  const classes = useStyles();
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

  const visitDataTableBodyHeaderProps = {
    setCheckGaepo,
    setCheckSeocho,
    checkGaepo,
    checkSeocho,
    searchOption,
    setSearchOption,
    searchValue,
    setSearchValue,
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <GridItem xs={12} sm={12} md={12}>
          <VisitDataTableCount />
          <Card>
            <CardHeader color="info" className={classes.cardHeader}>
              <VisitDataTableHeader />
            </CardHeader>
            <CardBody className={classes.cardBody}>
              <VisitDataTableBodyHeader {...visitDataTableBodyHeaderProps} />
              <Table tableHeaderColor="info" tableHead={VISITOR_TABLE_HEAD} tableData={tableData} />
            </CardBody>
          </Card>
        </GridItem>
      </GridItem>
    </GridContainer>
  );
};

export default VisitDataTablePresenter;
