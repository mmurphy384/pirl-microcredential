using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using Pirl.MicroCredentials.Core.Models.ValueObjects.Interfaces;

namespace Pirl.MicroCredentials.Core.Models.ValueObjects
{
    
    [Serializable]
    public abstract class ValueObject<T> : IValueObject, IEquatable<T> where T : class
    {
        public override bool Equals(object obj)
        {
            if (obj == null)
                return false;

            var other = obj as T;

            return Equals(other);
        }

        public override int GetHashCode()
        {
            var fields = GetFields();

            const int startValue = 17;
            const int multiplier = 59;

            var hashCode = startValue;

            foreach (FieldInfo field in fields)
            {
                var value = field.GetValue(this);

                if (value != null)
                    hashCode = hashCode * multiplier + value.GetHashCode();
            }

            return hashCode;
        }

        public virtual bool Equals(T other)
        {
            if (other == null)
                return false;

            var t = GetType();

            var fields = t.GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public);

            foreach (FieldInfo field in fields)
            {
                var value1 = field.GetValue(other);
                var value2 = field.GetValue(this);

                if (value1 == null)
                {
                    if (value2 != null)
                        return false;
                }
                else if (value2 == null)
                {
                    return false;
                }
                else if ((typeof(DateTime).IsAssignableFrom(field.FieldType)) ||
                         ((typeof(DateTime?).IsAssignableFrom(field.FieldType))))
                {
                    var dateString1 = ((DateTime)value1).ToLongDateString();
                    var dateString2 = ((DateTime)value2).ToLongDateString();
                    if (!dateString1.Equals(dateString2))
                    {
                        return false;
                    }
                }
                else if (field.FieldType.IsArray)
                {
                    if ((typeof (DateTime[]).IsAssignableFrom(field.FieldType)))
                    {
                        if (!value1.Equals(value2))
                            return false;
                    }
                    else
                    {
                        var object1Array = (object[]) value1;
                        var object2Array = (object[]) value2;

                        var array1HashCode = object1Array.Sum(object1 => object1.GetHashCode());
                        var array2HashCode = object2Array.Sum(object2 => object2.GetHashCode());

                        if (!array1HashCode.Equals(array2HashCode))
                        {
                            return false;
                        }
                    }
                }
                else if (!value1.Equals(value2))
                    return false;
            }

            return true;
        }

        private IEnumerable<FieldInfo> GetFields()
        {
            var t = GetType();

            var fields = new List<FieldInfo>();

            while (t != typeof(object))
            {
                fields.AddRange(t.GetFields(BindingFlags.Instance | BindingFlags.NonPublic | BindingFlags.Public));

                t = t.BaseType;
            }

            return fields;
        }

        public static bool operator ==(ValueObject<T> x, ValueObject<T> y)
        {
            return ReferenceEquals(x, null) ? ReferenceEquals(y, null) : x.Equals(y);
        }

        public static bool operator !=(ValueObject<T> x, ValueObject<T> y)
        {
            return !(x == y);
        }
    }
}
