import * as Yup from 'yup';

const foreignNameRegex = /^[a-zA-ZÆÐƎƏƐƔĲŊŒẞÞǷȜæðǝəɛɣĳŋœĸſßþƿȝĄƁÇĐƊĘĦĮƘŁØƠŞȘŢȚŦŲƯY̨Ƴąɓçđɗęħįƙłøơşșţțŧųưy̨ƴÁÀÂÄǍĂĀÃÅǺĄÆǼǢƁĆĊĈČÇĎḌĐƊÐÉÈĖÊËĚĔĒĘẸƎƏƐĠĜǦĞĢƔáàâäǎăāãåǻąæǽǣɓćċĉčçďḍđɗðéèėêëěĕēęẹǝəɛġĝǧğģɣĤḤĦIÍÌİÎÏǏĬĪĨĮỊĲĴĶƘĹĻŁĽĿʼNŃN̈ŇÑŅŊÓÒÔÖǑŎŌÕŐỌØǾƠŒĥḥħıíìiîïǐĭīĩįịĳĵķƙĸĺļłľŀŉńn̈ňñņŋóòôöǒŏōõőọøǿơœŔŘŖŚŜŠŞȘṢẞŤŢṬŦÞÚÙÛÜǓŬŪŨŰŮŲỤƯẂẀŴẄǷÝỲŶŸȲỸƳŹŻŽẒŕřŗſśŝšşșṣßťţṭŧþúùûüǔŭūũűůųụưẃẁŵẅƿýỳŷÿȳỹƴźżžẓ\s-,.\']+$/;
let schema = Yup.object({
  firstName: Yup.string()
    .max(120, 'Debe tener como máximo 120 caracteres')
    .matches(foreignNameRegex, 'No puede contener símbolos')
    .required('Este campo es obligatorio'),
  lastName: Yup.string()
    .max(120, 'Debe tener como máximo 120 caracteres')
    .matches(foreignNameRegex, 'No puede contener símbolos')
    .required('Este campo es obligatorio'),
  email: Yup.string().email('Introduce un email válido').max(250, 'Debe tener como máximo 250 caracteres').required('Este campo es obligatorio'),
  password: Yup.string()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/, 'La contraseña es demasiado insegura')
    .max(120, 'Debe tener como máximo 120 caracteres')
    .required('Este campo es obligatorio'),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password')], 'Las contraseñas no coinciden')
    .required('Este campo es obligatorio'),
});

export default {
  initialValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  },
  validationSchema: schema,
};
