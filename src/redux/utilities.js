import AppLogger from "../helpers/AppLogger";

export const getFilterredEmployees = (currentList, idToRemove) => {
  return currentList.filter((arr) => arr.id != idToRemove);
};
export const handleDocumentDataAppend = (state, action) => {
  switch (action.payload.data.type) {
    case "p45":
      return {
        documents: [...state.p45Documents.documents, action.payload.data],
        count: state.p45Documents.count + 1,
      };
    case "p60":
      return {
        documents: [...state.p60Documents.documents, action.payload.data],
        count: state.p60Documents.count + 1,
      };

    case "p11d":
      return {
        documents: [...state.p11dDocuments.documents, action.payload.data],
        count: state.p11dDocuments.count + 1,
      };
    case "other":
      return {
        documents: [...state.otherDocuments.documents, action.payload.data],
        count: state.otherDocuments.count + 1,
      };
    default:
      return null;
  }
};
export const handleRemoveDocuments = (state, action) => {
  const { itemType, itemID } = action.meta.arg.item;

  switch (itemType) {
    case "p45":
      return {
        ...state.p45Documents,
        documents: state.p45Documents.documents.filter(
          (doc) => doc.id !== itemID
        ),
        count: state.p45Documents.count - 1,
      };
    case "p60":
      return {
        ...state.p60Documents,
        documents: state.p60Documents.documents.filter(
          (doc) => doc.id !== itemID
        ),
        count: state.p60Documents.count - 1,
      };

    case "p11d":
      return {
        documents: state.p11dDocuments.documents.filter(
          (doc) => doc.id !== itemID
        ),
        count: state.p11dDocuments.count + 1,
      };
    case "other":
      return {
        documents: state.otherDocuments.documents.filter(
          (doc) => doc.id !== itemID
        ),
        count: state.otherDocuments.count + 1,
      };
    default:
      return null;
  }
};

export const handleCredentials = (payload) => {
  const { loginBody } = payload;
  const { ni_number, password, rememberMe } = loginBody;

  let credentails = null;

  if (rememberMe) {
    credentails = {
      ni_number,
      password,
      rememberMe,
    };
  }

  return credentails;
};
