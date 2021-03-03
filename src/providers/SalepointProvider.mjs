import convert from 'xml-js';

function parseSalepointsFromXmlString(xml) {
  const data = convert.xml2js(xml, { compact: true });
  return data.getSalepointByUserResponse.salepoint.map((sp) => ({
    name: sp.description._text,
    code: sp.name._text
  }));
}

export default class SalepointProvider {
  constructor({ salepointsByUserUrl, uriAccessorFactory, currentUser }) {
    this.salepointsByUserUrl = salepointsByUserUrl;
    this.uriAccessorFactory = uriAccessorFactory;
    this.currentUser = currentUser;
  }
  /*eslint no-unused-vars: ["error", { "args": "none" }]*/
  async getSalepoints() {
    const uriAccessor = this.uriAccessorFactory.getUriAccessor(
      this.salepointsByUserUrl.replace('${uid}', this.currentUser)
    );
    const xmldata = await uriAccessor.getContent();

    return parseSalepointsFromXmlString(xmldata);
  }
}
