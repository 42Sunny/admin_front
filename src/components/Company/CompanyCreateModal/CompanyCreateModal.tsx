import { Input, Modal } from '@mui/material';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import IconButton from 'components/IconButton/IconButton';
import React, { useState } from 'react';
import useCompanyInfo from '../CompanyInfoContainer/useCompanyInfo';
import useCompanyCreateModalStyles from './CompanyCreateModalStyles';

const CompanyCreateModal = () => {
  const classes = useCompanyCreateModalStyles();
  const { createCompany } = useCompanyInfo();
  const [name, setName] = useState('');
  const [place, setPlace] = useState('');

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const changePlace: React.ChangeEventHandler<HTMLSelectElement> = (event) =>
    setPlace(event.currentTarget.value);
  const postCreateCompany = () => {
    createCompany(name, place);
  };

  return (
    // TODO: waring 해결하기
    <Modal open={true}>
      <div>
        <Card className={classes.modalContainer}>
          <CardHeader color="info" className={classes.modalHeader}>
            <div>입실</div>
            <IconButton icon="close" className={classes.modalExit} />
          </CardHeader>
          <CardBody className={classes.modalBody}>
            <Input fullWidth value={name} placeholder="방문자 이름" onChange={changeName} />
            <select value={place} onChange={changePlace}>
              <option value="개포">개포</option>
              <option value="서초">서초</option>
            </select>
            <RegularButton color="info" onClick={postCreateCompany}>
              등록
            </RegularButton>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CompanyCreateModal;
