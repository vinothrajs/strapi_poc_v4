"use strict";

module.exports = {
  routes:[{
    method:"DELETE",
    path:"/deleteorders/:id",
    handler:"custom-controller.deleteorders"
  }
  ]
}
