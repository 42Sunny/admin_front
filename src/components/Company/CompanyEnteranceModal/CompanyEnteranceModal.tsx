import { Input, Modal } from '@mui/material';
import Card from 'components/Card/Card';
import CardBody from 'components/Card/CardBody';
import CardHeader from 'components/Card/CardHeader';
import RegularButton from 'components/CustomButtons/Button';
import IconButton from 'components/IconButton/IconButton';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router';
import useCompanyVisitorStore from 'store/modules/companyVisitor/useCompanyVisitorStore';
import parseDecimal from 'utils/parseDecimal';
import useCompanyEnteranceModalStyles from './CompanyEnteranceModalStyles';

const PLACE_GAEPO = '개포';
const PLACE_SEOCHO = '서초';

const CompanyEnteranceModal = () => {
  const params = useParams<{ id: string }>();
  const history = useHistory();
  const classes = useCompanyEnteranceModalStyles();
  const [name, setName] = useState('');
  const [place, setPlace] = useState(PLACE_GAEPO);
  const { enterCompanyVisitor } = useCompanyVisitorStore();

  const changeName = (event: React.ChangeEvent<HTMLInputElement>) => setName(event.target.value);
  const changePlace = (event: React.MouseEvent<HTMLLabelElement>) =>
    setPlace(event.currentTarget.innerText);
  const postEnterance = async () => {
    enterCompanyVisitor(place, parseDecimal(params.id), name);
    closeModal();
  };

  const closeModal = () => {
    history.goBack();
  };

  return (
    // TODO: waring 해결하기
    <Modal open={true} onClose={closeModal}>
      <div>
        <Card className={classes.modalContainer}>
          <CardHeader color="info" className={classes.modalHeader}>
            <div>입실</div>
            <IconButton icon="close" className={classes.modalExit} onClick={closeModal} />
          </CardHeader>
          <CardBody className={classes.modalBody}>
            <label className={classes.label} onClick={changePlace}>
              <input type="radio" className={classes.radio} checked={place === PLACE_GAEPO} />
              {PLACE_GAEPO}
            </label>
            <label className={classes.label} onClick={changePlace}>
              <input type="radio" className={classes.radio} checked={place === PLACE_SEOCHO} />
              {PLACE_SEOCHO}
            </label>
            <Input
              className={classes.input}
              fullWidth
              value={name}
              placeholder="방문자 이름"
              onChange={changeName}
            />
            <RegularButton color="info" onClick={postEnterance}>
              등록
            </RegularButton>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
};

export default CompanyEnteranceModal;
