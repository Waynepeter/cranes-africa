
import React from 'react';
import { useLocation } from 'react-router-dom';

import MenuLUser from './MenuLUser';
import MenuLSearch from './MenuLSearch';
import MenuLMailbox from './MenuLMailbox';
import MenuLLogs from './MenuLLogs';

function MainSidebar() {
  const location = useLocation();
  const linkArray = location.pathname.split(":");
  const pageRoute = linkArray[0];

  return (
    <aside className="main-sidebar">
      <section className="sidebar">
        <MenuLUser />
        <MenuLSearch />
        
        <ul className="sidebar-menu" data-widget="tree">
          <li className="header">NAVIGATION</li>
          <li className={ pageRoute === "/" || pageRoute === "/dashboard" ? "active" : "" }>
            <a href="/dashboard"><i className="fa fa-dashboard"></i> <span>Dashboard</span></a>
          </li>
          <li className={
              pageRoute === "/module-creation" ||
              pageRoute === "/module-profile" ||
              pageRoute === "/module-registry" ||
              pageRoute === "/value-profile" ||
              pageRoute === "/values" ||
              pageRoute === "/partner-profile" ||
              pageRoute === "/project-registry" ||
              pageRoute === "/project-profile" ||
              pageRoute === "/funfacts-registry" ||
              pageRoute === "/funfacts-profile" ||
              pageRoute === "/partners" ? "treeview active" : "treeview"
            }>
            <a href="#">
              <i className="fa fa-building"></i> <span>Organization</span>
              <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul className="treeview-menu">
              <li className={
                  pageRoute === "/module-creation" || 
                  pageRoute === "/module-registry" ||
                  pageRoute === "/module-profile" ? "treeview active" : "treeview"
                }>
                <a href="#">
                  <i className="fa fa-angle-right"></i> Modules
                  <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul className="treeview-menu">
                  <li className={pageRoute === "/module-creation" ? "active" : ""}>
                    <a href="/module-creation"><i className="fa fa-angle-right"></i> Create</a>
                  </li>
                  <li className={
                      pageRoute === "/module-registry" || 
                      pageRoute === "/module-profile" ? "active" : ""
                    }>
                    <a href="/module-registry"><i className="fa fa-angle-right"></i> Registry</a>
                  </li>
                </ul>
              </li>
              <li className={ pageRoute === "/value-profile" || pageRoute === "/values" ? "active" : "" }>
                <a href="/values"><i className="fa fa-angle-right"></i> Organization Values</a>
              </li>
              <li className={ pageRoute === "/partner-profile" || pageRoute === "/partners" ? "active" : "" }>
                <a href="/partners"><i className="fa fa-angle-right"></i> Business Partners</a>
              </li>
              <li className={ pageRoute === "/project-profile" || pageRoute === "/project-registry" ? "active" : "" }>
                <a href="/project-registry"><i className="fa fa-angle-right"></i> Projects</a>
              </li>
              <li className={ pageRoute === "/funfacts-profile" || pageRoute === "/funfacts-registry" ? "active" : "" }>
                <a href="/funfacts-registry"><i className="fa fa-angle-right"></i> Fun Facts</a>
              </li>
            </ul>
          </li>
          <li className={
              pageRoute === "/product-catalogue-registry" ||
              pageRoute === "/product-catalogue-profile" ||
              pageRoute === "/product-distribution-registry" ||
              pageRoute === "/product-distribution-profile" ||
              pageRoute === "/product-salemode-registry" ||
              pageRoute === "/product-salemode-profile" ||
              pageRoute === "/product-category-registry" ||
              pageRoute === "/product-category-profile" ||
              pageRoute === "/product-subcategory-registry" ||
              pageRoute === "/product-subcategory-profile" ||
              pageRoute === "/product-group-registry" ||
              pageRoute === "/product-group-profile" ||
              pageRoute === "/product-creation" ||
              pageRoute === "/product-registry" ||
              pageRoute === "/product-profile" ||
              pageRoute === "/service-registry" ||
              pageRoute === "/service-profile" ? "treeview active" : "treeview"
            }>
            <a href="#">
              <i class="fa fa-gift"></i> <span>Products</span>
              <span class="pull-right-container">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
            </a>
            <ul class="treeview-menu">
              {/* <li className={
                  pageRoute === "/product-catalogue-registry" ||
                  pageRoute === "/product-catalogue-profile" ||
                  pageRoute === "/product-distribution-registry" ||
                  pageRoute === "/product-distribution-profile" ||
                  pageRoute === "/product-salemode-registry" ||
                  pageRoute === "/product-salemode-profile" ||
                  pageRoute === "/product-category-registry" ||
                  pageRoute === "/product-category-profile" ||
                  pageRoute === "/product-subcategory-registry" ||
                  pageRoute === "/product-subcategory-profile" ||
                  pageRoute === "/product-group-registry" ||
                  pageRoute === "/product-group-profile" ||
                  pageRoute === "/product-creation" ||
                  pageRoute === "/product-registry" ||
                  pageRoute === "/product-profile" ? "treeview active" : "treeview"
                }>
                <a href="#">
                  <i class="fa fa-angle-right"></i> Goods
                  <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul class="treeview-menu">
                  <li className={
                    pageRoute === "/product-catalogue-registry" ||
                    pageRoute === "/product-catalogue-profile" ? "active" : "" }>
                    <a href="/product-catalogue-registry"><i className="fa fa-angle-right"></i> Catalogue
                    </a>
                  </li>
                  <li className={
                      pageRoute === "/product-distribution-registry" ||
                      pageRoute === "/product-distribution-profile" ? "active" : "" }>
                    <a href="/product-distribution-registry"><i className="fa fa-angle-right"></i> Distribution
                    </a>
                  </li>
                  <li className={
                      pageRoute === "/product-salemode-registry" ||
                      pageRoute === "/product-salemode-profile" ? "active" : "" }>
                    <a href="/product-salemode-registry"><i className="fa fa-angle-right"></i> Sale Mode
                    </a>
                  </li>
                  <li className={
                      pageRoute === "/product-category-registry" ||
                      pageRoute === "/product-category-profile" ? "active" : "" }>
                    <a href="/product-category-registry"><i className="fa fa-angle-right"></i> Category
                    </a>
                  </li>
                  <li className={
                      pageRoute === "/product-subcategory-registry" ||
                      pageRoute === "/product-subcategory-profile" ? "active" : "" }>
                    <a href="/product-subcategory-registry"><i className="fa fa-angle-right"></i> Sub category
                    </a>
                  </li>
                  <li className={
                      pageRoute === "/product-group-registry" ||
                      pageRoute === "/product-group-profile" ? "active" : "" }>
                    <a href="/product-group-registry"><i className="fa fa-angle-right"></i> Grouping
                    </a>
                  </li>
                  <li className={
                      pageRoute === "/product-creation" || 
                      pageRoute === "/product-registry" || 
                      pageRoute === "/product-profile" ? "treeview active" : "treeview"
                    }>
                    <a href="#"><i className="fa fa-angle-right"></i> Products
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li className={ pageRoute === "/product-creation" ? "active" : "" }>
                        <a href="/product-creation"><i class="fa fa-angle-right"></i> Add New</a>
                      </li>
                      <li className={
                          pageRoute === "/product-registry" ||
                          pageRoute === "/product-profile" ? "active" : ""
                        }>
                        <a href="/product-registry"><i class="fa fa-angle-right"></i> Registry</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li> */}

              <li className={
                  pageRoute === "/service-registry" ||
                  pageRoute === "/service-profile" ? "treeview active" : "treeview"
                }>
                <a href="#"><i class="fa fa-angle-right"></i> Services
                  <span class="pull-right-container">
                    <i class="fa fa-angle-left pull-right"></i>
                  </span>
                </a>
                <ul class="treeview-menu">
                  <li className={
                      pageRoute === "/service-registry" ||
                      pageRoute === "/service-profile" ? "active" : "" 
                    }>
                    <a href="/service-registry"><i class="fa fa-angle-right"></i> Service Registry</a>
                  </li>
                  {/* <li class="treeview">
                    <a href="#"><i class="fa fa-circle-o"></i> Level Two
                      <span class="pull-right-container">
                        <i class="fa fa-angle-left pull-right"></i>
                      </span>
                    </a>
                    <ul class="treeview-menu">
                      <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                      <li><a href="#"><i class="fa fa-circle-o"></i> Level Three</a></li>
                    </ul>
                  </li> */}
                </ul>
              </li>

            </ul>
          </li>
          <li className={
               pageRoute === "/subscription-registry"
            || pageRoute === "/faqs"
            || pageRoute === "/faq-profile"
            || pageRoute === "/faq-category"
            || pageRoute === "/faq-categories"
            || pageRoute === "/subscription-profile"
            || pageRoute === "/testimonials"
            || pageRoute === "/testimonial-profile"
            ? "treeview active" : "treeview" }>
            <a href="#">
              <i class="fa fa-newspaper-o"></i> <span>Media</span>
              <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul class="treeview-menu">
              <li className={
                  pageRoute === "/subscription-registry" ||
                  pageRoute === "/subscription-profile" ? "treeview active" : "treeview"
                }>
                <a href="#"><i className="fa fa-angle-right"></i> Subscription
                  <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul class="treeview-menu">
                  <li className={
                      pageRoute === "/subscription-registry" ||
                      pageRoute === "/subscription-profile" ? "active" : ""
                    }>
                    <a href="/subscription-registry"><i class="fa fa-angle-right"></i> Registry</a>
                  </li>
                </ul>
              </li>
              <li className={
                  pageRoute === "/faq-category" ||
                  pageRoute === "/faq-categories" ||
                  pageRoute === "/faq-profile" ||
                  pageRoute === "/faqs" ? "treeview active" : "treeview"
                }>
                <a href="#"><i className="fa fa-angle-right"></i> F.A.Q
                  <span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul class="treeview-menu">
                  <li className={
                      pageRoute === "/faq-profile" ||
                      pageRoute === "/faqs" ? "active" : ""
                    }>
                    <a href="/faqs"><i class="fa fa-angle-right"></i> Registry</a>
                  </li>
                  <li className={
                      pageRoute === "/faq-category" ||
                      pageRoute === "/faq-categories" ? "active" : ""
                    }>
                    <a href="/faq-categories"><i class="fa fa-angle-right"></i> Categories</a>
                  </li>
                </ul>
              </li>
              <li className={ pageRoute === "/testimonials" || pageRoute === "/testimonial-profile" ? "active" : "" }>
                <a href="/testimonials"><i className="fa fa-angle-right"></i> Testimonial
                </a>
              </li>


            </ul>
          </li>

          {/* <MenuLMailbox /> */}
          
          <li className={
              pageRoute === "/user-registration" || pageRoute === "/user-registry" || pageRoute === "/user-profile" || 
              pageRoute === "/resources" || pageRoute === "/resource-profile" || pageRoute === "/role-creation" || 
              pageRoute === "/role-registry" || pageRoute === "/permission-creation" || 
              pageRoute === "/permission-registry" || pageRoute === "/permission-to-resource" || pageRoute === "/permission-to-role" || 
              pageRoute === "/permission-profile" || pageRoute === "/role-profile" || pageRoute === "/designation-creation" || 
              pageRoute === "/designation-registry" || pageRoute === "/designation-profile"
              ? "treeview active" : "treeview"
            }>
            <a href="#">
              <i className="fa fa-users"></i> <span>Human Resource</span>
              <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul className="treeview-menu">
              <li className={pageRoute === "/user-registration" ? "active" : ""}>
                <a href="/user-registration"><i className="fa fa-angle-right"></i> User Registration</a>
              </li>
              <li className={pageRoute === "/user-registry" || pageRoute === "/user-profile" ? "active" : ""}>
                <a href="/user-registry"><i className="fa fa-angle-right"></i> User Registry</a>
              </li>
              <li className={pageRoute === "/resources" || pageRoute === "/resource-profile" ? "active" : ""}>
                <a href="/resources"><i className="fa fa-angle-right"></i> Resources</a>
              </li>
              <li className={pageRoute === "/role-creation" || pageRoute === "/role-registry" || 
                pageRoute === "/role-profile" ? "treeview active" : "treeview" }>
                <a href="#">
                  <i className="fa fa-angle-right"></i> Roles
                  <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul className="treeview-menu">
                  <li className={pageRoute === "/role-creation" ? "active" : ""}><a href="/role-creation"><i className="fa fa-angle-right"></i> New Role</a></li>
                  <li className={pageRoute === "/role-registry" || pageRoute === "/role-profile" ? "active" : ""}><a href="/role-registry"><i className="fa fa-angle-right"></i> Roles Registry</a></li>
                </ul>
              </li>
              <li className={pageRoute === "/permission-creation" || pageRoute === "/permission-registry" || 
                pageRoute === "/permission-to-resource" || pageRoute === "/permission-to-role" || 
                pageRoute === "/permission-profile" ? "treeview active" : "treeview" }>
                <a href="#">
                  <i className="fa fa-angle-right"></i> Permissions
                  <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul className="treeview-menu">
                  <li className={pageRoute === "/permission-creation" ? "active" : ""}>
                    <a href="/permission-creation"><i className="fa fa-angle-right"></i> New Permission</a>
                  </li>
                  <li className={pageRoute === "/permission-registry" || pageRoute === "/permission-profile" ? "active" : ""}>
                    <a href="/permission-registry"><i className="fa fa-angle-right"></i> Permissions Registry</a>
                  </li>
                </ul>
              </li>
              <li className={
                pageRoute === "/designation-creation" || pageRoute === "/designation-registry" || 
                pageRoute === "/designation-profile" ? "treeview active" : "treeview" }>
                <a href="#">
                  <i className="fa fa-angle-right"></i> Designations
                  <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
                </a>
                <ul className="treeview-menu">
                  <li className={pageRoute === "/designation-creation" ? "active" : ""}>
                    <a href="/designation-creation"><i className="fa fa-angle-right"></i> New Designation</a>
                  </li>
                  <li className={
                    pageRoute === "/designation-registry" || 
                    pageRoute === "/designation-profile" ? "active" : ""}>
                    <a href="/designation-registry"><i className="fa fa-angle-right"></i> Designation Registry</a>
                  </li>
                </ul>
              </li>

            </ul>
          </li>
          {/* <li className={
              pageRoute === "/gallery-categories" || 
              pageRoute === "/gallery-manage" ? "treeview active" : "treeview" 
            }>
            <a href="#">
              <i className="fa fa-folder-open"></i> <span>Gallery</span>
              <span className="pull-right-container"><i className="fa fa-angle-left pull-right"></i></span>
            </a>
            <ul className="treeview-menu">
              <li className={pageRoute === "/gallery-manage" ? "active" : ""}>
                <a href="/gallery-manage"><i className="fa fa-angle-right"></i> Manage</a>
              </li>
              <li className={pageRoute === "/gallery-categories" ? "active" : ""}>
                <a href="/gallery-categories"><i className="fa fa-angle-right"></i> Categories</a>
              </li>
            </ul>
          </li> */}
          
          {/* <MenuLLogs/> */}
        </ul>
      </section>
    </aside>
  );
}

export default MainSidebar;