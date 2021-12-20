import { Input, Modal } from '@material-ui/core';
import { Icon } from '@mui/material';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import IconButton from 'components/IconButton/IconButton';
import React, { useState } from 'react';
import CompanyContainer from '../CompanyContainer/CompanyContainer';
import useCompanyInfoContainerStyles from './CompanyInfoContainerStyles';
import useCompanyInfo from './useCompanyInfo';

const CompanyInfoContainer = () => {
  const { tableData, pagination, createCompany } = useCompanyInfo();
  const props = {
    header: <Header createCompany={createCompany} />,
    tableProps: {
      tableHead: ['업체 이름', '대표 번호', '입실', '삭제'],
      tableData: tableData,
    },
    paginationProps: {
      ...pagination,
    },
  };
  return <CompanyContainer {...props} />;
};

const Header = ({
  createCompany,
}: {
  createCompany: (name: string, phone: string) => Promise<void>;
}) => {
  const classes = useCompanyInfoContainerStyles();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const openDialog = () => setIsOpenDialog(true);
  const closeDialog = () => setIsOpenDialog(false);

  const modalProps = { isOpenDialog, closeDialog, createCompany };

  return (
    <>
      <div className={classes.container}>
        <div className={classes.title}>등록 업체</div>
        <button className={classes.addCompany} onClick={openDialog}>
          업체 등록
          <Icon className={classes.addIcon}>add_circle</Icon>
        </button>
      </div>
      <CreateModal {...modalProps} />
    </>
  );
};

type CreateModalPropTypes = {
  isOpenDialog: boolean;
  closeDialog: () => void;
  createCompany: (name: string, phone: string) => Promise<void>;
};

const CreateModal = ({ isOpenDialog, closeDialog, createCompany }: CreateModalPropTypes) => {
  const classes = useCompanyInfoContainerStyles();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const changePhone = (event: React.ChangeEvent<HTMLInputElement>) => setPhone(event.target.value);
  const postCreateCompany = () => {
    createCompany(name, phone);
  };

  return (
    // TODO: waring 해결하기
    <Modal open={isOpenDialog} onClose={closeDialog}>
      <div>
        <Card className={classes.modalContainer}>
          <CardHeader color="info" className={classes.modalHeader}>
            <div>업체 등록</div>
            <IconButton icon="close" className={classes.modalExit} onClick={closeDialog} />
          </CardHeader>
          <CardBody className={classes.modalBody}>
            <Input fullWidth value={name} placeholder="이름" onChange={changeName} />
            <Input fullWidth value={phone} placeholder="대표 연락처" onChange={changePhone} />
            <RegularButton color="info" onClick={postCreateCompany}>
              등록
            </RegularButton>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CompanyInfoContainer;
