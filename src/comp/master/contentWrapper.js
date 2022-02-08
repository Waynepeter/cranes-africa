import { Switch, Route } from 'react-router-dom';
import React from 'react';
import Dashboard from '../pages/dashboard';
import Resources from '../pages/resources';
import ResourceProfile from '../pages/resourceProfile';
import UserRegistry from '../pages/user/userRegistry';
import UserRegistration from '../pages/user/userRegistration';
import UserProfile from '../pages/user/userProfile';
import RoleCreation from '../pages/role/roleCreation';
import RoleProfile from '../pages/role/roleProfile';
import RoleRegistry from '../pages/role/roleRegistry';
import PermissionCreation from '../pages/permission/permissionCreation';
import PermissionProfile from '../pages/permission/permissionProfile';
import PermissionRegistry from '../pages/permission/permissionRegistry';
import ModuleCreation from '../pages/org/moduleCreation';
import ModuleProfile from '../pages/org/moduleProfile';
import ModuleRegistry from '../pages/org/moduleRegistry';
import ProjectRegistry from '../pages/org/project-registry';
import ProjectProfile from '../pages/org/project-profile';
import FunFactRegistry from '../pages/org/funfacts-registry';
import FunFactProfile from '../pages/org/funfact-profile';
import MailInbox from '../pages/mail/mailInbox';
import MailCompose from '../pages/mail/mailCompose';
import MailSent from '../pages/mail/mailSent';
import MailDraft from '../pages/mail/mailDraft';
import MailJunk from '../pages/mail/mailJunk';
import MailTrash from '../pages/mail/mailTrash';
import LogInfo from '../pages/log/logInfo';
import LogTrace from '../pages/log/logTrace';
import LogFatal from '../pages/log/logFatal';
import LogError from '../pages/log/logError';
import LogWarning from '../pages/log/logWarning';
import Error404 from '../pages/error/404';
import Error500 from '../pages/error/500';
import CatalogueRegistry from '../pages/product/goods/catalogue-registry';
import CatalogueProfile from '../pages/product/goods/catalogue-profile';
import DistributionRegistry from '../pages/product/goods/distribution-registry';
import DistributionProfile from '../pages/product/goods/distribution-profile';
import SalemodeRegistry from '../pages/product/goods/salemode-registry';
import SalemodeProfile from '../pages/product/goods/salemode-profile';
import ProductcatRegistry from '../pages/product/goods/category-registry';
import ProductcatProfile from '../pages/product/goods/category-profile';
import ProductsubcatRegistry from '../pages/product/goods/subcategory-registry';
import ProductsubcatProfile from '../pages/product/goods/subcategory-profile';
import ProductgroupRegistry from '../pages/product/goods/group-registry';
import ProductgroupProfile from '../pages/product/goods/group-profile';
import ProductCreation from '../pages/product/goods/product-create';
import ProductRegistry from '../pages/product/goods/product-registry';
import ProductProfile from '../pages/product/goods/product-profile';
import ServiceRegistry from '../pages/product/services/service-registry';
import ServiceProfile from '../pages/product/services/service-profile';
import Subscriptions from '../pages/media/subscriptions';
import Subscription from '../pages/media/subscription';
import Faq from '../pages/media/faq';
import Faqs from '../pages/media/faqs';
import FaqCategory from '../pages/media/faq-category';
import FAQCategories from '../pages/media/faq-categories';
import DesignationCreation from '../pages/org/designationCreation';
import DesignationProfile from '../pages/org/designationProfile';
import DesignationRegistry from '../pages/org/designationRegistry';
import Value from '../pages/org/value';
import Values from '../pages/org/values';
import Testimonial from '../pages/org/testimonial';
import Testimonials from '../pages/org/testimonials';
import Partner from '../pages/org/partner';
import Partners from '../pages/org/partners';

function ContentWrapper() {
  return (
    <Switch>
      <Route exact path="/" component={Dashboard} />
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/resources" component={Resources} />
      <Route exact path="/resource-profile:uuid" component={ResourceProfile} />
      <Route exact path="/user-registration" component={UserRegistration} />
      <Route exact path="/user-registry" component={UserRegistry} />
      <Route exact path="/user-profile:uuid" component={UserProfile} />
      <Route exact path="/role-creation" component={RoleCreation} />
      <Route exact path="/role-registry" component={RoleRegistry} />
      <Route exact path="/role-profile:uuid" component={RoleProfile} />
      <Route exact path="/permission-creation" component={PermissionCreation} />
      <Route exact path="/permission-registry" component={PermissionRegistry} />
      <Route exact path="/permission-profile:uuid" component={PermissionProfile} />
      <Route exact path="/module-creation" component={ModuleCreation} />
      <Route exact path="/module-profile:uuid" component={ModuleProfile} />
      <Route exact path="/module-registry" component={ModuleRegistry} />
      <Route exact path="/project-registry" component={ProjectRegistry} />
      <Route exact path="/project-profile:uuid" component={ProjectProfile} />
      <Route exact path="/funfacts-registry" component={FunFactRegistry} />
      <Route exact path="/funfacts-profile:uuid" component={FunFactProfile} />
      <Route exact path="/product-catalogue-registry" component={CatalogueRegistry} />
      <Route exact path="/product-catalogue-profile:uuid" component={CatalogueProfile} />
      <Route exact path="/product-distribution-registry" component={DistributionRegistry} />
      <Route exact path="/product-distribution-profile:uuid" component={DistributionProfile} />
      <Route exact path="/product-salemode-registry" component={SalemodeRegistry} />
      <Route exact path="/product-salemode-profile:uuid" component={SalemodeProfile} />
      <Route exact path="/product-category-registry" component={ProductcatRegistry} />
      <Route exact path="/product-category-profile:uuid" component={ProductcatProfile} />
      <Route exact path="/product-subcategory-registry" component={ProductsubcatRegistry} />
      <Route exact path="/product-subcategory-profile:uuid" component={ProductsubcatProfile} />
      <Route exact path="/product-group-registry" component={ProductgroupRegistry} />
      <Route exact path="/product-group-profile:uuid" component={ProductgroupProfile} />
      <Route exact path="/product-creation" component={ProductCreation} />
      <Route exact path="/product-registry" component={ProductRegistry} />
      <Route exact path="/product-profile:uuid" component={ProductProfile} />
      <Route exact path="/service-registry" component={ServiceRegistry} />
      <Route exact path="/service-profile:uuid" component={ServiceProfile} />
      <Route exact path="/mail-inbox" component={MailInbox} />
      <Route exact path="/mail-compose" component={MailCompose} />
      <Route exact path="/mail-sent" component={MailSent} />
      <Route exact path="/mail-draft" component={MailDraft} />
      <Route exact path="/mail-junk" component={MailJunk} />
      <Route exact path="/mail-trash" component={MailTrash} />
      <Route exact path="/subscription-registry" component={Subscriptions} />
      <Route exact path="/subscription-profile:uuid" component={Subscription} />
      <Route exact path="/faq-categories" component={FAQCategories} />
      <Route exact path="/faq-category:uuid" component={FaqCategory} />
      <Route exact path="/faqs" component={Faqs} />
      <Route exact path="/faq-profile:uuid" component={Faq} />
      <Route exact path="/designation-creation" component={DesignationCreation} />
      <Route exact path="/designation-registry" component={DesignationRegistry} />
      <Route exact path="/designation-profile:uuid" component={DesignationProfile} />
      <Route exact path="/values" component={Values} />
      <Route exact path="/value-profile:uuid" component={Value} />
      <Route exact path="/testimonials" component={Testimonials} />
      <Route exact path="/testimonial-profile:uuid" component={Testimonial} />
      <Route exact path="/partners" component={Partners} />
      <Route exact path="/partner-profile:uuid" component={Partner} />
      
      <Route exact path="/log-info" component={LogInfo} />
      <Route exact path="/log-trace" component={LogTrace} />
      <Route exact path="/log-fatal" component={LogFatal} />
      <Route exact path="/log-error" component={LogError} />
      <Route exact path="/log-warning" component={LogWarning} />
      <Route exact path="/404" component={Error404} />
      <Route exact path="/500" component={Error500} />
      <Route component={Error404} />
      {/* <Redirect to="/404" /> */}
    </Switch>
  );
}

export default ContentWrapper;