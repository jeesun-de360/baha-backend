import { ContactInfo, IContactInfo } from "./contactInfo.model";

export const getContactInfoService = async () => {
    const contactInfo = await ContactInfo.findOne();
    return contactInfo;
};
