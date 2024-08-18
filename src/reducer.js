import { ADD_WIDGET, REMOVE_WIDGET } from './action';
import dashboardData from './dummyData';

const initialState = dashboardData;

const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WIDGET:
      return state.map(category => {
        if (category.category === action.payload.category) {
          return {
            ...category,
            widgets: [...category.widgets, action.payload.widget],
          };
        }
        return category;
      });
    case REMOVE_WIDGET:
      return state.map(category => {
        if (category.category === action.payload.category) {
          return {
            ...category,
            widgets: category.widgets.filter(widget => widget.id !== action.payload.widgetId),
          };
        }
        return category;
      });
    default:
      return state;
  }
};

export default dashboardReducer;
