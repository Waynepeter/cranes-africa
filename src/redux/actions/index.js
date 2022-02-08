
export {
  fetchResources, fetchResource, resourcePermissionAlloc, resourcePermissionDeAlloc
} from './act-resource';
export {
  fetchPermissions, fetchPermission, createPermissions, updatePermission, deletePermissions
} from './act-permission';
export {
  fetchRoles, fetchRole, createRoles, rolePermissionAlloc, rolePermissionDeAlloc, deleteRoles,
  updateRole
} from './act-role';
export {
  fetchUsers, fetchMyProfile, fetchOtherProfile, createUsers, updateLogins, updateProfile, 
  loginUser, deleteUser, enrollStaff
} from './act-user';
export { fetchNode, fetchNetwork, fetchStats } from './act-dashboard';
export { uploadFile } from './act-file';
export {
  createModule, fetchModules, deleteModules, fetchModule, updateModule,
  createDesignation, updateDesignation, deleteDesignations, fetchDesignation, fetchDesignations,
  createValue, updateValue, deleteValues, fetchValue, fetchValues, createTestimonial, 
  updateTestimonial, deleteTestimonials, fetchTestimonial, fetchTestimonials, createPartner, 
  updatePartner, deletePartners, fetchPartner, fetchPartners,
  createProject, updateProject, deleteProjects, fetchProject, fetchProjects, 
  createFunfact, updateFunfact, deleteFunfacts, fetchFunfact, fetchFunfacts
} from './act-organization';
export {
  createCatalogue, updateCatalogue, deleteCatalogues, fetchCatalogue, fetchCatalogues, 
  createDistribution, updateDistribution, deleteDistributions, fetchDistribution, fetchDistributions, 
  createSalemode, updateSalemode, deleteSalemodes, fetchSalemode, fetchSalemodes, 
  createProductcat, updateProductcat, deleteProductcats, fetchProductcat, fetchProductcats, 
  createProductsubcat, updateProductsubcat, deleteProductsubcats, fetchProductsubcat, fetchProductsubcats, 
  createProductgroup, updateProductgroup, deleteProductgroups, fetchProductgroup, fetchProductgroups, 
  createProduct, updateProduct, deleteProducts, fetchProduct, fetchProducts
} from './act-products';
export {
  fetchSubscriptions, fetchSubscription, deleteSubscriptions,
  createFAQ, updateFAQ, deleteFAQs, fetchFAQ, fetchFAQs,
  createFAQCat, updateFAQCat, deleteFAQCats, fetchFAQCat, fetchFAQCats
} from './act-media';
export {
  createService, updateService, deleteServices, fetchService, fetchServices
} from './act-service';
